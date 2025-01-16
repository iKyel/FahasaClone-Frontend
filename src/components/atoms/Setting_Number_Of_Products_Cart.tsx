'use client';

import React, { useState } from 'react'

interface MyComponentProps {
    selectedQuantity: number;
    productId: string;
    handleChange: (id: string, newQuantity: number) => void;
}

const Setting_Number_Of_Products_Cart: React.FC<MyComponentProps> = ({ selectedQuantity, productId, handleChange }) => {
    const [isNaN, setIsNaN] = useState(false);

    const minusNumOfProducts = () => {
        if (selectedQuantity > 1) handleChange(productId, selectedQuantity - 1);
    }
    const plusNumOfProducts = () => {
        if (selectedQuantity < 999) handleChange(productId, selectedQuantity + 1);
    };

    //handleQuantityChange
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if ((inputValue !== '' && parseInt(inputValue) <= 999 && /^\d*$/.test(inputValue)) || inputValue === '') {
            handleChange(productId, parseInt(inputValue));
        }
        else if (inputValue === '') {
            setIsNaN(true);
        }
    };
    const handleBlur = () => {
        if (isNaN) {
            handleChange(productId, 1);
        }
    }
    return (
        <div className='flex items-center border-2 rounded'>
            <button className="px-1 text-2xl" onClick={minusNumOfProducts}><i className="fa-solid fa-minus fa-2xs text-gray-500"></i></button>
            <input
                type="text"
                id='numberOfProduct'
                className="text-center w-8 font-bold focus:outline-none focus:ring-0"
                value={selectedQuantity.toString()}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
            />
            <button className="px-1" onClick={plusNumOfProducts}>
                <i className="fa-solid fa-plus text-gray-500"></i>
            </button>
        </div>
    )
}

export default Setting_Number_Of_Products_Cart