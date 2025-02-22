import React, { useState } from 'react';
import {useGoogleLogin} from  '@react-oauth/google'
import {googleAuth} from '../api';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function GoogleLogin() {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try{
        console.log(authResult);
        if(authResult['code']){
          const result = await googleAuth(authResult['code']);
          const {email, name,image} = result.data.user;
          const token = result.data.token;
          const obj = {email, name, image, token};
          localStorage.setItem('user-info', JSON.stringify(obj));
          console.log('token : ', token)
          console.log('email name and image', result.data.user);
          navigate('/dashboard');
        }
    }
    catch(err){
      console.log('error while requesting google', err);
    }
  } 

  const googleLogin = useGoogleLogin({
    onSuccess : responseGoogle,
    onError : responseGoogle,
    flow : 'auth-code' 
  });
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-10  text-center'>
        <button className="btn m-5" onClick={googleLogin}>
          Login With Google
        </button>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">Or with email and password</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button className='btn btn-link m-3' onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Go to Register' : 'Go to Login'}
        </button>
        </div>
      </div>
    </div>
  );
}

export default GoogleLogin;