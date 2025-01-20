import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';


interface MyComponentProps {
    totalPrice: number;
    delivery: { name: string, price: number };
    payment: { name: string, value: string };
    handleSubmit: () => void;
}

//Options Paypal
const optionsPaypal = {
    clientId: "AWa7Z_Uj81NjV36f1oB9aw3GWj7ab0ztxnqBbuUAa044LNRcowbZNVR6SmMO_oMcdy4DYx3Qbd2ZHQdc",
    currency: "USD",
    intent: "capture",
    "disable-funding": "card",

}

const TotalPrice_Fixed: React.FC<MyComponentProps> = ({ totalPrice, delivery, payment, handleSubmit }) => {


    //handleApprove
    const handleApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            console.log("Transaction completed by " + details.payer.name.given_name)
            handleSubmit();
        })
    }

    return (
        <div className="fixed w-full z-40 bottom-0 right-0 bg-white py-2 shadow-2xl border-t-2 border-gray-400 flex items-center flex-col">
            <div className='w-5/6 flex justify-end pb-2 border-b-2'>
                <div className='flex flex-col items-end space-y-1'>
                    <p>Thành tiền</p>
                    <p>Phí vận chuyển({delivery.name})</p>
                    <p className='font-bold'>Tổng số tiền(gồm VAT)</p>
                </div>
                <div className='flex flex-col pl-16 items-end space-y-1'>
                    <span className=''>{totalPrice.toLocaleString()}₫</span>
                    <span className=''>{delivery.price.toLocaleString()}₫</span>
                    <span className='font-bold text-yellow-500 text-xl'>{(totalPrice + delivery.price).toLocaleString()}₫</span>
                </div>
            </div>
            <div className='w-5/6 py-3 flex justify-end'>
                {payment.value === 'PayPal'
                    ? (
                        <div className='w-1/4'>
                            <PayPalScriptProvider options={optionsPaypal}>
                                <PayPalButtons
                                    style={{
                                        shape: "rect",
                                        layout: "vertical",
                                        color: "gold",
                                        label: "buynow",
                                    }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            intent: "CAPTURE",
                                            purchase_units: [{
                                                amount: {
                                                    currency_code: "USD",
                                                    value: `${Math.round(((totalPrice + delivery.price) / 24000) * 100) / 100}`
                                                }
                                            }]
                                        })
                                    }}
                                    onApprove={handleApprove}
                                />
                            </PayPalScriptProvider>
                        </div>

                    )
                    : (
                        <button
                            className='py-2 px-16 bg-red-700 text-white font-bold text-lg rounded-lg'
                            onClick={handleSubmit}
                        >
                            Xác nhận thanh toán
                        </button>
                    )}

            </div>
        </div>
    )
}

export default TotalPrice_Fixed