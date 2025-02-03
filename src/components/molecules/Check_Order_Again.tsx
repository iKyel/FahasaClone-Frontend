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
                    <div className='md:w-1/6 cursor-pointer flex'>
                        <img
                            src={product.imageUrl}
                            alt={product.tenSP}
                            className='w-36 h-36 object-contain' />
                    </div>

                    <div className='md:w-5/6 md:justify-normal md:flex-row flex flex-col justify-between items-start'>
                        <div className='md:w-2/3 cursor-pointer'>
                            <p className=''>{product.tenSP}</p>
                        </div>

                        <div className='md:w-1/3 md:flex cursor-pointer'>
                            <div className='md:w-1/3 flex md:flex-col text-center'>
                                <p>{product.khuyenMai > 0
                                    ? Math.round((product.giaBan * (1 - product.khuyenMai / 100))).toLocaleString()
                                    : product.giaBan.toLocaleString()}
                                    ₫
                                </p>
                                {product.khuyenMai > 0 &&
                                    <span className='line-through text-gray-500 ml-2 md:ml-0'>{product.giaBan.toLocaleString()}₫</span>
                                }
                            </div>

                            <div className='md:w-1/3 md:text-center'>
                                <p>
                                    <span className='md:hidden mr-2'>Số lượng:</span>
                                    {product.soLuong}
                                </p>
                            </div>

                            <div className='md:w-1/3 md:text-center font-bold'>
                                <p className='text-yellow-500'>
                                    <span className='md:hidden mr-2'>Thành tiền:</span>
                                    {product.thanhTien.toLocaleString()}₫
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Check_Order_Again