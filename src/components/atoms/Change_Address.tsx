'use client'

import React, { useState } from 'react'
import Layout_OneStepCheckout_Prop from './Layout_OneStepCheckout_Prop'
import Address_Option from '../molecules/Address_Option'

interface MyComponentProps {
    addressList: string[];
    currentAddress: string;
    selectedAddress: string;
    handleSelectAddress: (diaChi: string, name: string) => void;
    onClose: () => void;
}

const Change_Address: React.FC<MyComponentProps> = ({ addressList, currentAddress, selectedAddress, handleSelectAddress, onClose }) => {
    const [selectedItem, setSelectedItem] = useState(selectedAddress);

    const handleSelectItem = (diaChi: string) => {
        setSelectedItem(diaChi);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className='bg-white rounded-lg'>
                <Layout_OneStepCheckout_Prop text='ĐỊA CHỈ GIAO HÀNG'>
                    <Address_Option
                        diaChi={addressList}
                        selectedAddress={selectedItem}
                        handleSelectAddress={handleSelectItem}
                    />
                    <div className='flex justify-around mt-4'>
                        <button
                            className='py-2 md:px-20 px-10 border-2 border-black rounded-lg'
                            onClick={onClose}
                        >Hủy
                        </button>
                        <button
                            className={`ml-4 py-2 md:px-20 px-10 rounded-lg text-white ${currentAddress !== selectedItem ? 'bg-red-700' : 'bg-red-400'}`}
                            disabled={currentAddress === selectedItem}
                            onClick={() => handleSelectAddress(selectedItem, 'address')}
                        >
                            Xác nhận
                        </button>
                    </div>
                </Layout_OneStepCheckout_Prop>
            </div>

        </div>
    )
}

export default Change_Address