'use client';

import { useUser } from '@/contexts/AppContext';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface MyComponentProps {
    src: string;
    text: string;
    style: string;
    id: string;
}

const Button_Header: React.FC<MyComponentProps> = observer(({ src, text, style, id }) => {
    const router = useRouter();
    const userStore = useUser();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleButton_Header = () => {
        if (userStore && userStore.user) {
            if (id === 'cart') router.push('/cart');
            if (id === 'account') router.push('/customer/profile');
        }
        else router.push('/login_signin');
    }
    return (
        <div onClick={handleButton_Header} className='cursor-pointer'>
            <img src={src} alt="logo_acc" className={style} />
            {id === 'account' && isClient && userStore?.user
                ?
                <p className='hidden md:block text-xs text-slate-500'>
                    {(userStore.user.ten + ' ' + userStore.user.hoDem).length >= 10 ? (userStore.user.ten + ' ' + userStore.user.hoDem).slice(0, 7) + '...' : (userStore.user.ten + ' ' + userStore.user.hoDem)}
                </p>
                :
                <p className='text-xs text-slate-500'>
                    {text}
                </p>
            }
        </div>
    )
});

export default Button_Header