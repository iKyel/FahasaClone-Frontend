'use client';

import Login_Signin_Nav from '@/components/molecules/Login_Signin_Nav';
import Login from '@/components/organisms/Login';
import Signin from '@/components/organisms/Signin';
import React, { useState } from 'react';

const Login_Signin: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleNav = (data: boolean) => {
        setIsLogin(data);
    }

    return (
        <div className="p-10 rounded flex justify-center bg-white">
            <div className="w-2/5 p-5">
                <Login_Signin_Nav handleNav={handleNav} isLogin={isLogin} />

                {isLogin ? (
                    <Login />
                ) : (
                    <Signin handleNav={handleNav} />
                )}
            </div>
        </div >
    );
};

export default Login_Signin;
