'use client';

import { useOrder, useOrderDetail, useUser } from '@/contexts/AppContext';
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
    const orderStore = useOrder();
    const orderDetailStore = useOrderDetail();

    const [numProd, setNumProd] = useState(0);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3412');
        ws.onopen = () => {
            console.log("Connected to ws");
        }

        ws.onmessage = (event) => {
            if (event.data) {
                const { numOfProducts } = event.data as unknown as { numOfProducts: number }
                setNumProd(numOfProducts)
            }
        }

        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        const fetchData = async () => {
            const result = await orderStore?.getCart();
            if (result && result.cartDetail) {
                setNumProd(result.cartDetail.length);
            }
        }
        fetchData();
        setIsClient(true);
        return () => {
            ws.close();
        };
    }, [orderDetailStore?.cartDetail?.length]);

    const handleButton_Header = () => {
        if (userStore && userStore.user) {
            if (id === 'cart') router.push('/cart');
            if (id === 'account') router.push('/customer/profile');
        }
        else router.push('/login_signin');
    }
    return (
        <div onClick={handleButton_Header} className='cursor-pointer'>
            <div className='relative'>
                <img src={src} alt="logo" className={style} />
                {id === 'cart' && isClient && userStore?.user && <p className='absolute bottom-4 right-0 px-1 text-xs rounded-full bg-yellow-400'>{numProd}</p>}
            </div>

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