'use client'
import Order_Status_Completed from '@/components/atoms/Order_Status_Completed';
import Order_Status_Confirm from '@/components/atoms/Order_Status_Confirm';
import Order_Status_Confirmed from '@/components/atoms/Order_Status_Confirmed';
import Order_Status_Failed from '@/components/atoms/Order_Status_Failed';
import { useOrder } from '@/contexts/AppContext'
import { formatDate } from '@/utils/fommat_date';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Orders = observer(() => {
    const router = useRouter();
    const orderStore = useOrder();

    useEffect(() => {
        const fetchData = async () => {
            await orderStore?.getOrders();
        }
        fetchData();
    }, [])

    const orderOption = [
        { name: 'Tất cả', quantity: orderStore?.orders?.length },
        { name: 'Chờ xác nhận', quantity: orderStore?.orders?.length ? orderStore?.orders?.filter((order) => order.trangThaiDon === 'Chờ xác nhận').length : 0 },
        { name: 'Đã xác nhận', quantity: orderStore?.orders?.length ? orderStore?.orders?.filter((order) => order.trangThaiDon === 'Đã xác nhận').length : 0 },
        { name: 'Hoàn thành', quantity: orderStore?.orders?.length ? orderStore?.orders?.filter((order) => order.trangThaiDon === 'Hoàn thành').length : 0 },
        { name: 'Đã hủy', quantity: orderStore?.orders?.length ? orderStore?.orders?.filter((order) => order.trangThaiDon === 'Đã hủy').length : 0 }
    ]

    const deliveryList = [
        { name: 'Giao hàng tiết kiệm', price: 10000 },
        { name: 'Giao hàng tiêu chuẩn', price: 20000 },
        { name: 'Giao hàng hỏa tốc', price: 40000 }
    ];

    const [currentOption, setCurrentOption] = useState(orderOption[0].name);

    const handleCancelOrder = async (id: string) => {
        await orderStore?.cancelOrder(id);
    }

    const handleCompleteOrder = async (id: string) => {
        await orderStore?.completeOrder(id);
    }

    if (!orderStore?.orders?.length) {
        return (
            <div className='h-screen flex flex-col items-center justify-center bg-white text-gray-500'>
                <img src="/images/cart/ico_emptycart_2.svg" alt="Hết hàng" />
                <p className='mt-4'>Bạn chưa có đơn hàng nào</p>
            </div>
        )
    }

    return (
        <div className='space-y-2'>
            <div className='pt-4 bg-white rounded-lg'>
                <h3 className='font-bold px-4 text-gray-500 text-xl'>Đơn hàng của tôi</h3>
                <div className='flex mt-4'>
                    {orderOption.map((item, index) => (
                        <div
                            className={`w-1/4 pb-4 flex flex-col items-center hover:text-red-700 ${currentOption === item.name ? 'border-b-2 border-red-700 text-red-700' : ''}`}
                            key={index}
                            onClick={() => setCurrentOption(item.name)}
                        >
                            <span>{item.quantity}</span>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            {orderStore?.orders?.filter((order) => currentOption === 'Tất cả' || order.trangThaiDon === currentOption).length
                ? orderStore?.orders?.
                    filter((order) => currentOption === 'Tất cả' || order.trangThaiDon === currentOption).
                    map((order, index) => (
                        <div
                            className='bg-white p-4 rounded-lg space-y-2 shadow-lg'
                            key={index}

                        >
                            <div
                                className='flex justify-between pb-6 cursor-pointer'
                                onClick={() => { router.push(`/customer/orders/${order._id}`) }}
                            >
                                <div className='space-x-2'>
                                    <span className='text-blue-500'>{order._id}</span>
                                    {order.trangThaiDon === 'Chờ xác nhận' && <Order_Status_Confirm />}
                                    {order.trangThaiDon === 'Đã xác nhận' && <Order_Status_Confirmed />}
                                    {order.trangThaiDon === 'Hoàn thành' && <Order_Status_Completed />}
                                    {order.trangThaiDon === 'Đã hủy' && <Order_Status_Failed />}
                                </div>
                                <div>
                                    <span>{formatDate(order.createdAt || '')}</span>
                                </div>
                            </div>

                            <div className='flex justify-between items-end pt-2 pb-4 border-t-2'>
                                <div>
                                    <span>{order.soLuong || 0} sản phẩm</span>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p>Tổng tiền:
                                        <span className='ml-2 font-bold'>
                                            {(order.tongTien + (deliveryList.find((item) => order.ptVanChuyen === item.name)?.price || 0)).toLocaleString()}₫
                                        </span>
                                    </p>
                                    <div>
                                        {order.trangThaiDon === 'Chờ xác nhận' && (
                                            <button
                                                className={`px-16 py-2 rounded-lg text-sm mt-2 ${order.trangThaiDon === 'Chờ xác nhận' ? 'bg-red-700 text-white' : 'bg-white border-2 text-black cursor-not-allowed'}`}
                                                onClick={() => handleCancelOrder(order._id)}
                                                disabled={order.trangThaiDon !== 'Chờ xác nhận'}
                                            >
                                                Hủy đơn
                                            </button>
                                        )}

                                        {order.trangThaiDon === 'Đã xác nhận' && (
                                            <button
                                                className={`ml-4 px-16 py-2 rounded-lg text-sm mt-2 ${order.trangThaiDon === 'Đã xác nhận' ? 'bg-green-700 text-white' : 'bg-white border-2 text-black cursor-not-allowed'}`}
                                                onClick={() => handleCompleteOrder(order._id)}
                                                disabled={order.trangThaiDon !== 'Đã xác nhận'}
                                            >
                                                Hoàn thành
                                            </button>
                                        )}

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                : (
                    <div className='h-screen flex flex-col items-center justify-center bg-white text-gray-500'>
                        <img src="/images/cart/ico_emptycart_2.svg" alt="Hết hàng" />
                        <p className='mt-4'>Bạn chưa có đơn hàng nào</p>
                    </div>
                )
            }
        </div>
    )
});

export default Orders