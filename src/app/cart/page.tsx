'use client';

import Modal from '@/components/atoms/Modal';
import Cart_Payment_Button from '@/components/molecules/Cart_Payment_Button';
import Table_Header_Row from '@/components/molecules/Table_Header_Row';
import Table_Product_Row from '@/components/molecules/Table_Product_Row';
import { useOrder, useOrderDetail } from '@/contexts/AppContext';
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'


const Cart = observer(() => {
    const orderStore = useOrder();
    const orderDetailStore = useOrderDetail();

    const [selectAll, setSelectAll] = useState(orderDetailStore?.cartDetail?.every((product) => product.daChon === true) || false);

    //Modal
    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        const fetchData = async () => {
            await orderStore?.getCart();
        }
        fetchData();
    }, []);

    const handleModal = () => {
        setIsModalOpen(false);
    }

    const handleSelectAll = async () => {
        setSelectAll(!selectAll);
        await orderStore?.selectOrderDetail(!selectAll);
    };

    const handleSelectProduct = async (id: string) => {
        await orderStore?.selectOrderDetail(id);
    };

    const handleUpdateProduct = async (productId: string, newQuantity: number) => {
        const result = await orderStore?.updateProductToCart(productId, newQuantity);
        if (result && result.message && result.message !== 'Cập nhật giỏ hàng thành công!') {
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        await orderStore?.deleteProductToCart(id);
    };


    if (!orderDetailStore?.cartDetail?.length) {
        return (
            <>
                {isClient && (
                    <div className='h-screen'>
                        <h1 className='text-xl my-4 flex items-center text-center'>
                            GIỎ HÀNG
                            <span className='ml-1 text-base'>
                                (0 sản phẩm)
                            </span>
                        </h1>
                        <div className='text-center w-full h-96 bg-white rounded-lg flex flex-col justify-center items-center'>
                            <img className='w-40 h-40' src="/images/cart/ico_emptycart_2.svg" alt="emptycart" />
                            <p className='my-4 text-sm'>Chưa có sản phẩm trong giỏ hàng của bạn.</p>
                            <button className='py-2 px-16 rounded-lg bg-red-700 text-white '>
                                Mua sắm ngay
                            </button>
                        </div>
                    </div>
                )}
            </>
        )
    }

    return (
        <>
            {isClient && (
                <div className='my-2'>
                    <h1 className='text-xl my-4 flex items-center text-center'>
                        GIỎ HÀNG
                        <span className='ml-1 text-base'>
                            ({orderDetailStore?.cartDetail?.length} sản phẩm)
                        </span>
                    </h1>

                    <div className='flex items-start'>
                        <div className='w-2/3 mr-4'>
                            <Table_Header_Row
                                quantity={orderDetailStore?.cartDetail?.length}
                                selectAll={selectAll}
                                handleSelectAll={handleSelectAll}
                            />

                            {isClient &&
                                (
                                    <Table_Product_Row
                                        products={orderDetailStore.cartDetail}
                                        handleSelectProduct={handleSelectProduct}
                                        handleUpdateProduct={handleUpdateProduct}
                                        handleDeleteProduct={handleDeleteProduct}
                                    />
                                )
                            }
                        </div>

                        <div className='w-1/3 p-4 bg-white rounded-lg sticky top-0'>
                            <Cart_Payment_Button
                                totalPrice={orderStore?.cart?.tongTien || 0}
                            />
                        </div>
                    </div>
                </div>
            )}
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={handleModal}
            />
        </>
    )
});

export default Cart