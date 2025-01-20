'use client'
import Layout_OneStepCheckout_Prop from '@/components/atoms/Layout_OneStepCheckout_Prop';
import Address_Option from '@/components/molecules/Address_Option';
import Check_Order_Again from '@/components/molecules/Check_Order_Again';
import Delivery_Option from '@/components/molecules/Delivery_Option';
import Note_Option from '@/components/molecules/Note_Option';
import Payment_Option from '@/components/molecules/Payment_Option';
import TotalPrice_Fixed from '@/components/molecules/TotalPrice_Fixed';
import { useOrder, useOrderDetail, useUser } from '@/contexts/AppContext'
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const deliveryList = [
    { name: 'Giao hàng tiết kiệm', price: 10000 },
    { name: 'Giao hàng tiêu chuẩn', price: 20000 },
    { name: 'Giao hàng hỏa tốc', price: 40000 }
];

const paymentList = [
    { name: 'Thanh toán bằng PayPal', value: 'PayPal' },
    { name: 'Thanh toán bằng tiền mặt khi nhận hàng', value: 'Tiền mặt khi nhận hàng' },
]

const OneStepCheckout = observer(() => {
    const router = useRouter()
    const userStore = useUser();
    const orderStore = useOrder();
    const orderDetailStore = useOrderDetail();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        const fetchData = async () => {
            const result = await orderStore?.getCartSelected();
            if (result && result.tongTien) {
                setTotalPrice(result.tongTien);
            }
        }
        fetchData();
    }, []);

    const [totalPrice, setTotalPrice] = useState(0);
    const [diaChi, setDiaChi] = useState(userStore?.user?.diaChi[0] || '');
    const [delivery, setDelivery] = useState(deliveryList[1]);
    const [payment, setPayment] = useState(paymentList[paymentList.length - 1]);
    const [note, setNote] = useState('');

    const handleSelectAddress = (diaChi: string) => {
        setDiaChi(diaChi);
    }

    const handleSelectDelivery = (delivery: string) => {
        const selectedDelivery = deliveryList.find((item) => delivery === item.name) || deliveryList[1];
        setDelivery(selectedDelivery);
    }

    const handleSelectPayment = (payment: string) => {
        const selectedPayment = paymentList.find((item) => payment === item.value) || paymentList[paymentList.length - 1];
        setPayment(selectedPayment);
    }

    const handleChangeNote = (note: string) => {
        setNote(note);
    }

    const handleSubmit = async () => {
        const result = await orderStore?.createOrder(diaChi, delivery.name, payment.value, note);
        if (result && result.message && result.message === 'Tạo đơn đặt hàng thành công') {
            router.push('successPayment');
        }
    }

    return (
        <div className='my-1'>
            {isClient && (
                <div>
                    <Layout_OneStepCheckout_Prop text='ĐỊA CHỈ GIAO HÀNG'>
                        <Address_Option
                            diaChi={userStore?.user?.diaChi || []}
                            selectedAddress={diaChi || ''}
                            handleSelectAddress={handleSelectAddress}
                        />
                    </Layout_OneStepCheckout_Prop>

                    <Layout_OneStepCheckout_Prop text='PHƯƠNG THỨC VẬN CHUYỂN'>
                        <Delivery_Option
                            deliveryList={deliveryList}
                            selectedDelivery={delivery.name}
                            handleSelectDelivery={handleSelectDelivery}
                        />
                    </Layout_OneStepCheckout_Prop>

                    <Layout_OneStepCheckout_Prop text='PHƯƠNG THỨC THANH TOÁN'>
                        <Payment_Option
                            payment={paymentList}
                            selectedPayment={payment.value}
                            handleSelectPayment={handleSelectPayment}
                        />
                    </Layout_OneStepCheckout_Prop>

                    <Layout_OneStepCheckout_Prop text='THÔNG TIN KHÁC'>
                        <Note_Option
                            note={note}
                            handleChangeNote={handleChangeNote}
                        />
                    </Layout_OneStepCheckout_Prop>

                    <Layout_OneStepCheckout_Prop text='KIỂM TRA LẠI ĐƠN HÀNG'>
                        <Check_Order_Again
                            products={orderDetailStore?.cartDetail || []}
                        />
                    </Layout_OneStepCheckout_Prop>

                    <TotalPrice_Fixed
                        totalPrice={totalPrice}
                        delivery={delivery}
                        handleSubmit={handleSubmit}
                        payment={payment}
                    />
                </div>
            )}
        </div>
    )
});

export default OneStepCheckout