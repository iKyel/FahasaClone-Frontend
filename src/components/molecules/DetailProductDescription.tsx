'use client';

import { useProduct } from '@/contexts/AppContext'
import React from 'react'

const DetailProductDescription = () => {
    const productStore = useProduct();
    return (
        <div className='mt-2 p-4 rounded-lg bg-white'>
            <h3 className="text-lg font-bold mb-2">Thông tin chi tiết</h3>
            <p>{productStore?.productDetail && productStore?.productDetail?.moTa.length > 0 ? `${productStore?.productDetail?.moTa}` : '(Không có mô tả)'}</p>
        </div>
    )
}

export default DetailProductDescription