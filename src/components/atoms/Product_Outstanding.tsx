'use client';

import { useProduct } from '@/contexts/AppContext';
import { IProduct } from '@/stores/productStore';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface MyComponentProps {
    list: { imageUrl: string, categoryId: string, name: string };
}

const Product_Outstanding: React.FC<MyComponentProps> = observer(({ list }) => {
    const router = useRouter()
    const productStore = useProduct();
    const [products, setProducts] = useState<IProduct[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await productStore?.getProducts({ category: list.categoryId });
            if (result && result.products) {
                setProducts(result.products);
            }
        }
        fetchData();
    }, [list])

    return (
        <div className='w-1/4 mt-2 p-2 bg-white rounded-lg cursor-pointer'>
            <div onClick={() => router.push(`/products?category=${list.categoryId}`)}>
                <p className='text-lg font-bold mb-4'>{list.name}</p>
                <img src={list.imageUrl} alt={list.name} className='w-full object-contain' />
            </div>
            <div className='py-4 flex justify-around'>
                {
                    products && products.slice(0, 3).map((item, index) => (
                        <div
                            key={index}
                            className=' text-gray-700 cursor-pointer flex items-center'
                            onClick={() => router.push(`/products/${item._id}`)}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.tenSP}
                                className='w-20 h-20 object-contain'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
});

export default Product_Outstanding