'use client';

import React, { useState } from 'react'

interface MyComponentProps {
    selectedQuantity: number;
    productId: string;
    handleChange: (id: string, newQuantity: number) => void;
}

const Setting_Number_Of_Products_Cart: React.FC<MyComponentProps> = ({ selectedQuantity, productId, handleChange }) => {
    const [num, setNum] = useState(selectedQuantity.toString());

    const minusNumOfProducts = () => {
        if (parseInt(num) > 1) {
            setNum((parseInt(num) - 1).toString());
            handleChange(productId, parseInt(num) - 1);
        }
    }
    const plusNumOfProducts = () => {
        if (parseInt(num) < 999) {
            setNum((parseInt(num) + 1).toString());
            handleChange(productId, parseInt(num) + 1);
        }
    };

    //handleQuantityChange
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if ((inputValue !== '' && parseInt(inputValue) <= 999 && /^\d*$/.test(inputValue))) {
            setNum(inputValue);
            handleChange(productId, parseInt(inputValue));
        }
        else if (inputValue === '') {
            setNum(inputValue);
        }
    };
    const handleBlur = () => {
        if (num === '') {
            setNum('1');
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