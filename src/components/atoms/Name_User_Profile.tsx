'use client'
import { useUser } from '@/contexts/AppContext';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'


const Name_User_Profile = observer(() => {
    const userStore = useUser();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div className='flex flex-col items-center border-b-2'>
            <div className='mb-4 p-1 border-4 border-gray-100 rounded-full'>
                <img src="/images/customer/icon_rank_silver.png" alt="" className='w-20 h-20' />
            </div>

            {isClient && userStore?.user ? (
                <p className="mb-4">
                    <span className="rounded-md px-4 py-1 text-xl">
                        {userStore.user.hoDem + " " + userStore.user.ten}
                    </span>
                </p>
            ) : (
                <p className="mb-4">
                    <span className="rounded-md px-4 py-1 text-xl">
                        Người dùng
                    </span>
                </p>
            )}
        </div>
    )
});

export default Name_User_Profile