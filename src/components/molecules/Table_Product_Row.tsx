import { IOrderDetail } from '@/stores/orderDetail';
import { useRouter } from 'next/navigation';
import React from 'react'
import Setting_Number_Of_Products_Cart from '../atoms/Setting_Number_Of_Products_Cart';

interface MyComponentProps {
    products: IOrderDetail[];
    handleSelectProduct: (id: string) => void;
    handleUpdateProduct: (id: string, newQuantity: number) => void;
    handleDeleteProduct: (id: string) => void;
}

const Table_Product_Row: React.FC<MyComponentProps> = ({ products, handleSelectProduct, handleUpdateProduct, handleDeleteProduct }) => {
    const router = useRouter();
    return (
        <div className='p-2 rounded-lg bg-white'>
            <table className="w-full text-left">
                <tbody className="">
                    {products.map((product, index) => (
                        <tr
                            key={index}
                            className="text-center"
                        >
                            <td
                                className={`w-7/12 py-4 ${products && index === products.length - 1 ? "border-b-0" : "border-b-2"
                                    }`}
                            >
                                <div className="flex">
                                    <div className='w-1/3 flex items-center'>
                                        <input
                                            type="checkbox"
                                            checked={product.daChon}
                                            onChange={() => handleSelectProduct(product._id)}
                                            className="w-5 h-5 mx-3 "
                                        />
                                        <img
                                            src={product.imageUrl}
                                            alt={product.tenSP}
                                            className="w-32 h-32 rounded-md object-contain cursor-pointer"
                                            onClick={() => router.push(`/products/${product.sanPhamId}`)}
                                        />
                                    </div>

                                    <div
                                        className='w-2/3 px-4 flex flex-col justify-between items-start text-start cursor-pointer'
                                        onClick={() => router.push(`/products/${product.sanPhamId}`)}
                                    >
                                        <span>{product.tenSP.length > 74 ? product.tenSP.slice(0, 71) + '...' : product.tenSP}</span>
                                        <div>
                                            <span className='font-bold mr-2'>{Math.round(product.giaBan * (1 - (product.khuyenMai || 0) / 100)).toLocaleString()}₫</span>
                                            <span className='text-gray-500 line-through'>{product.giaBan.toLocaleString()}₫</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td
                                className={`w-1/12 ${products && index === products.length - 1 ? "border-b-0" : "border-b-2"
                                    }`}
                            >
                                <Setting_Number_Of_Products_Cart
                                    selectedQuantity={product.soLuong}
                                    productId={product._id}
                                    handleChange={handleUpdateProduct}
                                />
                            </td>
                            <td
                                className={`w-1/6 text-red-700 font-bold ${products && index === products.length - 1 ? "border-b-0" : "border-b-2"
                                    }`}
                            >
                                {product.thanhTien.toLocaleString()}₫
                            </td>
                            <td
                                className={`w-1/12 ${products && index === products.length - 1 ? "border-b-0" : "border-b-2"
                                    }`}
                            >
                                <i
                                    onClick={() => {
                                        handleDeleteProduct(product._id);
                                    }}
                                    className="fa-regular fa-trash-can fa-lg ml-1 cursor-pointer"
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table_Product_Row