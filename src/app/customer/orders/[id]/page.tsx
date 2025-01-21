'use client'

import Order_Status_Completed from '@/components/atoms/Order_Status_Completed';
import Order_Status_Confirm from '@/components/atoms/Order_Status_Confirm';
import Order_Status_Failed from '@/components/atoms/Order_Status_Failed';
import { useOrder, useOrderDetail, useUser } from '@/contexts/AppContext';
import { formatDate } from '@/utils/fommat_date';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'

interface ProductDetailProps {
    params: Promise<{
        id: string;
    }>;
}

const deliveryList = [
    { name: 'Giao hàng tiết kiệm', price: 10000 },
    { name: 'Giao hàng tiêu chuẩn', price: 20000 },
    { name: 'Giao hàng hỏa tốc', price: 40000 }
];

const OrderDetail: React.FC<ProductDetailProps> = observer(({ params }) => {
    const router = useRouter();
    const { id } = use(params);
    const userStore = useUser();
    const orderStore = useOrder();
    const orderDetailStore = useOrderDetail();

    useEffect(() => {
        const fetchData = async () => {
            await orderStore?.getOrderDetail(id);
        }
        fetchData();
    }, []);

    const orderDetail = orderStore?.orders?.[0];

    if (!orderDetail) {
        return (
            <></>
        )
    }

    return (
        <div className='space-y-2'>
            <div className='p-4 bg-white rounded-lg space-y-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <h3 className='font-bold mr-2 text-lg'>Mã đơn hàng {orderDetail._id}</h3>
                        {orderDetail.trangThaiDon === 'Chờ xác nhận' && <Order_Status_Confirm />}
                        {orderDetail.trangThaiDon === 'Hoàn thành' && <Order_Status_Completed />}
                        {orderDetail.trangThaiDon === 'Đã hủy' && <Order_Status_Failed />}
                    </div>
                    <span className='text-sm text-gray-500'>Ngày mua: {formatDate(orderStore?.orders?.[0].createdAt || '')}</span>
                </div>
                <div className='flex space-x-2 text-sm'>
                    <div className='w-5/12 p-4 shadow-lg rounded-lg border-2'>
                        <p className='font-bold'>Thông tin người nhận</p>
                        <div className='mt-2'>
                            <p>{userStore?.user?.hoDem + ' ' + userStore?.user?.ten}</p>
                            <p>{userStore?.user?.sdt}</p>
                            <p>{orderDetail.diaChiDatHang}</p>
                        </div>
                    </div>
                    <div className='w-3/12 p-4 shadow-lg rounded-lg border-2'>
                        <p className='font-bold'>Phương thức thanh toán</p>
                        <div className='mt-2'>
                            <p>{orderDetail.ptThanhToan}</p>
                        </div>
                    </div>
                    <div className='w-4/12 p-4 shadow-lg rounded-lg border-2'>
                        <p className='font-bold'>Tổng tiền</p>
                        <div className='mt-2'>
                            <div className='flex justify-between items-start'>
                                <div className='flex flex-col space-y-1'>
                                    <p>Thành tiền</p>
                                    <p>Phí vận chuyển</p>
                                    <p className='font-bold'>Tổng số tiền(gồm VAT)</p>
                                </div>
                                <div className='flex flex-col items-end space-y-1'>
                                    <span className=''>{orderDetail.tongTien.toLocaleString()}₫</span>
                                    <span className=''>{(deliveryList.find((item) => orderDetail.ptVanChuyen === item.name)?.price || 0).toLocaleString()}₫</span>
                                    <span className='font-bold text-red-700'>{(orderDetail.tongTien + (deliveryList.find((item) => orderDetail.ptVanChuyen === item.name)?.price || 0)).toLocaleString()}₫</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='space-x-2 flex'>
                <div className='w-1/2 p-4 bg-white rounded-lg text-sm'>
                    <p className='font-bold'>Phương thức vận chuyển</p>
                    <div className='mt-2'>
                        <p>{orderDetail.ptVanChuyen}</p>
                    </div>
                </div>
                <div className='w-1/2 p-4 bg-white rounded-lg text-sm'>
                    <p className='font-bold'>Ghi chú</p>
                    <div className='mt-2'>
                        <p>{orderDetail.ghiChu.length > 0 ? orderDetail.ghiChu : '(Không có)'}</p>
                    </div>
                </div>
            </div>

            <div className='p-4 bg-white rounded-lg text-sm'>
                <div className='flex items-center justify-between'>
                    <h3 className='font-bold mr-2'>Mã đơn hàng {orderDetail._id}</h3>
                    {orderDetail.trangThaiDon === 'Chờ xác nhận' && <Order_Status_Confirm />}
                    {orderDetail.trangThaiDon === 'Hoàn thành' && <Order_Status_Completed />}
                    {orderDetail.trangThaiDon === 'Đã hủy' && <Order_Status_Failed />}
                </div>
                <div className='flex text-gray-500 items-center mt-4 pb-2 border-b-2'>
                    <div className='w-2/3'>Số lượng ({orderDetailStore?.orderDetail?.length})</div>
                    <div className='w-1/12 text-center'>Giá</div>
                    <div className='w-1/12 text-center'>Số lượng</div>
                    <div className='w-2/12 text-center'>Thành tiền</div>
                </div>
                {orderDetailStore?.orderDetail?.map((item, index) => (
                    <div
                        className='flex text-gray-800 mt-4 pb-2 border-b-2 cursor-pointer'
                        key={index}
                        onClick={() => router.push(`/products/${item.sanPhamId}`)}
                    >
                        <div className='w-2/3 flex'>
                            <img
                                src={item.imageUrl}
                                alt={item.tenSP}
                                className='w-24 h-24 object-contain' />
                            <p className='ml-2'>{item.tenSP}</p>
                        </div>
                        <div className='w-1/12 text-center'>
                            <p>{item.khuyenMai > 0
                                ? Math.round((item.giaBan * (1 - item.khuyenMai / 100))).toLocaleString()
                                : item.giaBan.toLocaleString()}
                                ₫
                            </p>
                            {item.khuyenMai > 0 &&
                                <span className='line-through text-gray-500'>{item.giaBan.toLocaleString()}₫</span>
                            }
                        </div>
                        <div className='w-1/12 text-center'>
                            <p>{item.soLuong}</p>
                        </div>
                        <div className='w-2/12 text-center'>
                            <p className='font-bold'>{item.thanhTien.toLocaleString()}₫</p>
                        </div>
                    </div>
                ))}
                <div className='flex justify-end mr-12 mt-2'>
                    <div className='w-1/4 flex justify-between items-start'>
                        <div className='flex flex-col space-y-1'>
                            <p>Thành tiền</p>
                            <p>Phí vận chuyển</p>
                            <p className='font-bold'>Tổng số tiền</p>
                        </div>
                        <div className='flex flex-col items-end space-y-1'>
                            <span className=''>{orderDetail.tongTien.toLocaleString()}₫</span>
                            <span className=''>{(deliveryList.find((item) => orderDetail.ptVanChuyen === item.name)?.price || 0).toLocaleString()}₫</span>
                            <span className='font-bold text-red-700'>{(orderDetail.tongTien + (deliveryList.find((item) => orderDetail.ptVanChuyen === item.name)?.price || 0)).toLocaleString()}₫</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
});

export default OrderDetail