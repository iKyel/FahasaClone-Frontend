'use client';

import React, { useState } from 'react'

const Setting_Number_Of_Products = () => {
    const [numOfProducts, setNumOfProducts] = useState('1');

    const minusNumOfProducts = () => {
        if (parseInt(numOfProducts) > 1) setNumOfProducts((parseInt(numOfProducts) - 1).toString());
    }
    const plusNumOfProducts = () => {
        if (parseInt(numOfProducts) < 999) setNumOfProducts((parseInt(numOfProducts) + 1).toString());
    };

    //handleQuantityChange
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if ((inputValue !== '' && parseInt(inputValue) <= 999 && /^\d*$/.test(inputValue)) || inputValue === '') {
            setNumOfProducts(inputValue);
        }
    };
    const handleBlur = () => {
        if (numOfProducts === "") {
            setNumOfProducts("1");
        }
    }

    return (
        <div className="my-2 p-4 rounded-lg bg-white">
            <div className='flex items-center '>
                <div>
                    <label htmlFor='numberOfProduct' className='text-gray-700 font-bold'>Số lượng: </label>
                </div>
                <div className='ml-12 flex items-center border-2 rounded'>
                    <button className="px-3 text-2xl" onClick={minusNumOfProducts}><i className="fa-solid fa-minus fa-2xs text-gray-500"></i></button>
                    <input
                        type="text"
                        id='numberOfProduct'
                        className="text-center w-12 font-bold focus:outline-none focus:ring-0"
                        value={numOfProducts}
                        onChange={handleQuantityChange}
                        onBlur={handleBlur}
                    />
                    <button className="px-3" onClick={plusNumOfProducts}><i className="fa-solid fa-plus text-gray-500"></i></button>
                </div>

            </div>

        </div>
    )
}

export default Setting_Number_Of_Products