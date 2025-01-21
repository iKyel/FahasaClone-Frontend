import React from 'react';
import { IProduct } from '@/stores/productStore';
import { useRouter } from 'next/navigation';

interface ProductListProps {
    products: IProduct[] | null;
}

const Product_List: React.FC<ProductListProps> = ({ products }) => {
    const router = useRouter();
    return (
        <div>
            <div className='grid grid-cols-4 gap-2'>
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={index}
                            className="hover:shadow-lg hover:border-2 p-2 cursor-pointer"
                            onClick={() => { router.push(`/products/${product._id}`) }}
                        >
                            <div className="relative">
                                <img
                                    src={product.imageUrl}
                                    alt={product.tenSP}
                                    className="w-52 h-52 object-contain"
                                />
                                {/* % Khuyến mãi */}
                                {product.khuyenMai > 0 && (
                                    <span className="absolute top-2 right-2 h-10 w-10 bg-red-700 text-white text-sm font-bold p-2 rounded-full flex items-center justify-center">
                                        -{product.khuyenMai}%
                                    </span>
                                )}

                                {/* Hết hàng */}
                                {product.soLuong === 0 && (
                                    <span className="absolute top-0 left-0 h-6 w-24 bg-red-300 text-red-700 text-sm font-bold p-2 flex items-center justify-center">
                                        Hết hàng
                                    </span>
                                )}
                            </div>
                            <h3 className='h-12 my-2'>{product.tenSP && product.tenSP.length > 58 ? product.tenSP.slice(0, 55) + '...' : product.tenSP}</h3>
                            <div className='h-12 my-2'>
                                <p className='font-bold text-lg text-red-700'>
                                    {product.giaBan ? Math.round(product.giaBan * (1 - product.khuyenMai / 100)).toLocaleString() : '0'}₫
                                </p>
                                {product.khuyenMai > 0 && (
                                    <p className='line-through text-gray-600'>
                                        {product.giaBan.toLocaleString()}₫
                                    </p>
                                )}
                            </div>

                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
        </div>

    );
};

export default Product_List;
