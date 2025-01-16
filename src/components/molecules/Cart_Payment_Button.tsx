import { useRouter } from 'next/navigation';
import React from 'react'

interface MyComponentProps {
    totalPrice: number
}

const Cart_Payment_Button: React.FC<MyComponentProps> = ({ totalPrice }) => {
    const router = useRouter();

    const handlePayment = () => {
        router.push('/payment');
    }

    return (
        <div>
            <div className='flex justify-between pb-2'>
                <span>Thành tiền</span>
                <span>
                    {totalPrice.toLocaleString()}₫
                </span>
            </div>
            {totalPrice > 0 && (
                <div className='flex justify-between py-2'>
                    <span className='w-2/3'>Phí vận chuyển (Giao hàng tiêu chuẩn)</span>
                    <span>
                        {(20000).toLocaleString()}₫
                    </span>
                </div>
            )}
            <div className='flex justify-between py-2 border-t-2'>
                <span className='font-bold'>Tổng số tiền (Gồm VAT)</span>
                <span className='font-bold text-red-700 text-xl'>
                    {(totalPrice + (totalPrice > 0 ? 20000 : 0)).toLocaleString()}₫
                </span>
            </div>

            <button
                className='w-full mt-2 p-2 bg-red-500 hover:bg-red-700 text-white font-bold text-xl rounded-lg'
                onClick={handlePayment}
            >
                Thanh Toán
            </button>
        </div>
    )
}

export default Cart_Payment_Button