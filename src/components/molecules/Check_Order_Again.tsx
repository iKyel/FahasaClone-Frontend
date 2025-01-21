import { IOrderDetail } from '@/stores/orderDetail'
import { useRouter } from 'next/navigation';
import React from 'react'
interface MyComponentProps {
    products: IOrderDetail[];
}

const Check_Order_Again: React.FC<MyComponentProps> = ({ products }) => {
    const router = useRouter();
    return (
        <div>
            {products.length > 0 && products.map((product, index) => (
                <div
                    key={index}
                    className='w-full flex py-2 text-sm border-b-2'
                    onClick={() => router.push(`/products/${product.sanPhamId}`)}
                >
                    <div className='w-3/4 cursor-pointer flex'>
                        <img
                            src={product.imageUrl}
                            alt={product.tenSP}
                            className='w-36 h-36 object-contain' />
                        <p className='ml-2'>{product.tenSP}</p>
                    </div>

                    <div className='w-1/12 flex flex-col text-center'>
                        <p>{product.khuyenMai > 0
                            ? Math.round((product.giaBan * (1 - product.khuyenMai / 100))).toLocaleString()
                            : product.giaBan.toLocaleString()}
                            ₫
                        </p>
                        {product.khuyenMai > 0 &&
                            <span className='line-through text-gray-500'>{product.giaBan.toLocaleString()}₫</span>
                        }
                    </div>

                    <div className='w-1/12 text-center'>
                        <p>{product.soLuong}</p>
                    </div>

                    <div className='w-1/12 text-center font-bold'>
                        <p className='text-yellow-500'>{product.thanhTien.toLocaleString()}₫</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Check_Order_Again