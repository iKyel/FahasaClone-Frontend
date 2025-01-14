'use client';

import { useProduct } from '@/contexts/AppContext'
import React from 'react'

const DetailProductDescription = () => {
    const productStore = useProduct();
    return (
        <div className='mt-2 p-4 rounded-lg bg-white'>
            <h3 className="text-lg font-bold mb-4">Thông tin chi tiết</h3>
            <p>{productStore?.productDetail?.moTa}</p>
        </div>
    )
}

export default DetailProductDescription