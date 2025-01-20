import React from 'react'


interface MyComponentProps {
    payment: { name: string, value: string }[];
    selectedPayment: string;
    handleSelectPayment: (diaChi: string) => void;
}

const Payment_Option: React.FC<MyComponentProps> = ({ payment, selectedPayment, handleSelectPayment }) => {

    return (
        <div className="my-2 text-sm">
            {payment.map((item, index) => (
                <div
                    className="py-2 flex items-center"
                    key={index}
                >
                    <input
                        type='radio'
                        id={`payment${index}`}
                        name="payment"
                        checked={selectedPayment === item.value}
                        value={item.value}
                        onChange={(e) => {
                            handleSelectPayment(e.target.value)
                        }}
                        className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <label htmlFor={`payment${index}`} className='cursor-pointer'>{item.name}</label>
                </div>
            ))
            }
        </div>
    )
}

export default Payment_Option