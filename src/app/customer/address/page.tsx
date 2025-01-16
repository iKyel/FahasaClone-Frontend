'use client'

import Modal from '@/components/atoms/Modal';
import { useUser } from '@/contexts/AppContext'
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'

const ChangeAddress = observer(() => {
    const userStore = useUser();

    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);

    //handleSetDefautAddress
    const handleSetDefautAddress = async (index: number) => {
        const result = await userStore?.setDefaultAddress(index);
        if (result && result.message) {
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    }

    //handleDeleteAddress
    const handleDeleteAddress = async (index: number) => {
        const result = await userStore?.deleteAddress(index);
        if (result && result.message) {
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    }


    return (
        <div className="w-full p-4 bg-white rounded-lg">
            <div className='flex justify-between items-center mb-4'>
                <h3 className="text-lg">Sổ địa chỉ</h3>
                <a className='text-sm text-blue-500' href="/customer/address/new">+ Thêm địa chỉ mới</a>
            </div>
            {userStore && userStore.user && userStore.user.diaChi && userStore.user.diaChi.map((item, index) => {
                if (index === 0)
                    return (
                        <div key={index}>
                            <h4 className='font-bold border-b-2 mb-2'>Địa chỉ mặc định</h4>
                            <p>{item}</p>
                            <h4 className='font-bold border-b-2 mb-2 mt-6'>Địa chỉ khác</h4>
                        </div>
                    )

                else {
                    return (
                        <div key={index} className='flex justify-between items-center'>
                            <p className='mb-2'>{item}</p>
                            <div>
                                <span
                                    onClick={() => { handleSetDefautAddress(index) }}
                                    className='mr-1 text-blue-500 text-sm cursor-pointer'
                                >
                                    Đặt làm mặc định
                                </span>
                                |
                                <i
                                    onClick={() => { handleDeleteAddress(index) }}
                                    className="fa-regular fa-trash-can ml-1 cursor-pointer"
                                >
                                </i>
                            </div>
                        </div>
                    )
                }
            })
            }
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={() => { setIsModalOpen(false) }}
            />
        </div>
    )
});

export default ChangeAddress