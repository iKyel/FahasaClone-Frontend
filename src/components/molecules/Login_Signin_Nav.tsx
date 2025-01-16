import React from 'react'
interface MyComponentProps {
    handleNav: (data: boolean) => void;
    isLogin: boolean
}

const Login_Signin_Nav: React.FC<MyComponentProps> = ({ handleNav, isLogin }) => {
    return (
        <ul className="w-full mb-4 flex justify-around items-center text-center text-sm space-x-4">
            <li
                className={`w-1/2 p-2 cursor-pointer ${isLogin ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700'}`}
                onClick={() => handleNav(true)}
            >
                Đăng nhập
            </li>
            <li
                className={`w-1/2 p-2 cursor-pointer ${!isLogin ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700'}`}
                onClick={() => handleNav(false)}
            >
                Đăng ký
            </li>
        </ul>
    )
}

export default Login_Signin_Nav