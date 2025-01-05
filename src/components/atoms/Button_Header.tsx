'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

interface MyComponentProps {
    src: string;
    text: string;
    style: string;
}

const Button_Header: React.FC<MyComponentProps> = ({ src, text, style }) => {
    const router = useRouter();

    const handleButton_Header = () => {
        router.push('/login_signin');
    }
    return (
        <div onClick={handleButton_Header} className='cursor-pointer'>
            <img src={src} alt="logo_acc" className={style} />
            <p className='text-xs text-slate-500'>{text}</p>
        </div>
    )
}

export default Button_Header