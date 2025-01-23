'use client'

import React, { useState } from 'react'
import Layout_OneStepCheckout_Prop from './Layout_OneStepCheckout_Prop'
import Delivery_Option from '../molecules/Delivery_Option';

interface MyComponentProps {
    deliveryList: { name: string, price: number }[];
    currentDelivery: string;
    selectedDelivery: string;
    handleSelectDelivery: (delivery: string, name: string) => void;
    onClose: () => void;
}

const Change_Delivery: React.FC<MyComponentProps> = ({ deliveryList, currentDelivery, selectedDelivery, handleSelectDelivery, onClose }) => {
    const [selectedItem, setSelectedItem] = useState(selectedDelivery);

    const handleSelectItem = (delivery: string) => {
        setSelectedItem(delivery);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className='bg-white rounded-lg'>
                <Layout_OneStepCheckout_Prop text='PHƯƠNG THỨC VẬN CHUYỂN'>
                    <Delivery_Option
                        deliveryList={deliveryList}
                        selectedDelivery={selectedItem}
                        handleSelectDelivery={handleSelectItem}
                    />
                    <div className='flex justify-around mt-4'>
                        <button
                            className='py-2 px-20 border-2 border-black rounded-lg'
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            className={`ml-10 py-2 px-20 rounded-lg text-white ${currentDelivery !== selectedItem ? 'bg-red-700' : 'bg-red-400'}`}
                            disabled={currentDelivery === selectedItem}
                            onClick={() => handleSelectDelivery(selectedItem, 'delivery')}
                        >
                            Xác nhận
                        </button>
                    </div>
                </Layout_OneStepCheckout_Prop>
            </div>

        </div>
    )
}

export default Change_Delivery