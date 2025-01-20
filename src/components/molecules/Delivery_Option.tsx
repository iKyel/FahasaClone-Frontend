import React from 'react'
interface MyComponentProps {
    deliveryList: { name: string, price: number }[];
    selectedDelivery: string;
    handleSelectDelivery: (delivery: string) => void;
}

const Delivery_Option: React.FC<MyComponentProps> = ({ deliveryList, selectedDelivery, handleSelectDelivery }) => {
    return (
        <div className="my-2 text-sm">
            {deliveryList.map((item, index) => (
                <div
                    className="py-2 flex items-center"
                    key={index}
                >
                    <input
                        type='radio'
                        id={`vanchuyen${index}`}
                        name="vanChuyen"
                        checked={selectedDelivery === item.name}
                        value={item.name}
                        onChange={(e) => {
                            handleSelectDelivery(e.target.value)
                        }}
                        className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <label htmlFor={`vanchuyen${index}`} className='cursor-pointer font-bold'>{item.name + ': ' + item.price.toLocaleString() + '₫'}</label>
                </div>
            ))
            }
        </div>
    )
}

export default Delivery_Option