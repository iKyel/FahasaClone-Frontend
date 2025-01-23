'use client';

import React, { useState } from 'react'
interface MyComponentProps {
    handleChange: (numberOfProduct: number) => void;
}


const Setting_Number_Of_Products: React.FC<MyComponentProps> = ({ handleChange }) => {
    const [num, setNum] = useState('1');

    const minusNumOfProducts = () => {
        if (parseInt(num) > 1) {
            setNum((parseInt(num) - 1).toString());
            handleChange(parseInt(num) - 1);
        }
    }
    const plusNumOfProducts = () => {
        if (parseInt(num) < 999) {
            setNum((parseInt(num) + 1).toString());
            handleChange(parseInt(num) + 1);
        }
    };

    //handleQuantityChange
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if ((inputValue !== '' && parseInt(inputValue) <= 999 && /^\d*$/.test(inputValue)) || inputValue === '') {
            setNum(inputValue);
            handleChange(parseInt(inputValue));
        }
        else if (inputValue === '') {
            setNum(inputValue);
        }
    };
    const handleBlur = () => {
        if (num === '' || num === '0') {
            setNum('1');
            handleChange(1);
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
                        value={num}
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