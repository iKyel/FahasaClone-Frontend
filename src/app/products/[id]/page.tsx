'use client';

import Modal from "@/components/atoms/Modal";
import DetailProductDescription from "@/components/molecules/DetailProductDescription";
import DetailProductInfo from "@/components/molecules/DetailProductInfo";
import Setting_Number_Of_Products from "@/components/molecules/Setting_Number_Of_Products";
import Product_List_DetailProduct from "@/components/organisms/Product_List_DetailProduct";
import { useFeature, useOrder, useProduct } from "@/contexts/AppContext";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface ProductDetailProps {
    params: Promise<{
        id: string;
    }>;
}

const ProductDetail: React.FC<ProductDetailProps> = observer(({ params }) => {
    const router = useRouter();
    const productStore = useProduct();
    const featureStore = useFeature();
    const orderStore = useOrder();
    const { id } = use(params);

    const [numberOfProduct, setNumberOfProduct] = useState(1);

    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await productStore?.getProductDetail(id);
            if (productStore?.productDetail?.danhMucId)
                await productStore?.getProducts({ category: productStore.productDetail?.danhMucId })
        }
        fetchData();
    }, [productStore])

    const handleAddCart = async () => {
        const result = await orderStore?.addProductToCart(id, numberOfProduct);
        if (result && result.message) {
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    }

    const handleBuyNow = async () => {
        const result = await orderStore?.addProductToCart(id, numberOfProduct);
        if (result && result.message) {
            if (result.message !== 'Số lượng sản phẩm trong giỏ hàng vượt quá số lượng tồn!') {
                router.push('/cart');
            }
            else {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
        }
    }

    const handleModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <div className="flex w-full gap-4 items-start">
                {/* Div bên trái */}
                <div className="w-2/5 p-4 sticky top-0 bg-white rounded-lg">
                    <div className="w-full h-auto p-2">
                        <img
                            src={productStore?.productDetail?.imageUrl}
                            alt={productStore?.productDetail?.tenSP}
                            className="w-full h-96 object-contain"
                        />
                    </div>

                    <div className="flex w-full py-4">
                        <button
                            onClick={handleAddCart}
                            className="w-1/2 mr-2 px-4 py-2 rounded-lg bg-white border-2 border-red-700 text-red-700"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="w-1/2 ml-2 px-4 py-2 rounded-lg bg-red-700 text-white"
                        >
                            Mua ngay
                        </button>
                    </div>

                    <div className="">
                        <p className="font-bold text-gray-900">Chính sách ưu đãi của Fahasa</p>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><i className="fa-solid fa-truck-fast text-red-700 mr-1"></i><span className="font-bold mr-1 text-gray-900">Thời gian giao hàng:</span>Giao nhanh và uy tín</li>
                            <li><i className="fa-solid fa-boxes-packing text-red-700 mr-1"></i><span className="font-bold mr-1 text-gray-900">Chính sách đổi trả:</span> Đổi trả miễn phí toàn quốc</li>
                            <li><i className="fa-solid fa-store text-red-700 mr-1"></i><span className="font-bold mr-1 text-gray-900">Chính sách khách sỉ:</span> Ưu đãi khi mua số lượng lớn</li>
                        </ul>
                    </div>
                </div>

                {/* Div bên phải */}
                <div className="w-3/5">
                    <div className="p-4 bg-white rounded-lg">
                        {/* Tiêu đề sản phẩm */}
                        <h1 className="text-2xl mb-2">{productStore?.productDetail?.tenSP}</h1>

                        {/* Nhà cung cấp và thông tin */}
                        <div className="grid grid-cols-2 gap-x-32 mb-4 text-sm">
                            {featureStore?.supplier && (
                                <div className="flex">
                                    <p className="text-gray-800">Nhà cung cấp: </p>
                                    <p className="text-gray-900 font-bold">{featureStore?.supplier?.ten}</p>
                                </div>
                            )}

                            {featureStore?.featureValue?.map((feature, index) =>
                                ['Tác giả', 'Nhà xuất bản', 'Hình thức', 'Thương hiệu', 'Xuất xứ thương hiệu', 'Độ tuổi'].includes(feature.ten)
                                && (
                                    <div key={index} className="flex mt-1">
                                        <p className="text-gray-800">{feature.ten}:</p>
                                        <p className="text-gray-900 font-bold ml-2">{feature.giaTri}</p>
                                    </div>
                                ))
                            }

                        </div>

                        {/* Giá sản phẩm */}
                        <div className="flex items-center gap-4">
                            <p className="text-3xl font-bold text-red-700">
                                {productStore?.productDetail && productStore.productDetail.khuyenMai > 0
                                    ? (productStore?.productDetail?.giaBan * (1 - productStore.productDetail.khuyenMai / 100)).toLocaleString()
                                    : productStore?.productDetail?.giaBan.toLocaleString()
                                }₫
                            </p>
                            {productStore?.productDetail && productStore.productDetail.khuyenMai > 0 && (
                                <>
                                    <p className="text-base text-gray-500 line-through">
                                        {productStore.productDetail.giaBan.toLocaleString() + '₫'}
                                    </p>
                                    <p className="px-1 bg-red-700 rounded text-sm text-white font-bold">
                                        -{productStore.productDetail.khuyenMai + '%'}
                                    </p>
                                </>
                            )}
                        </div>

                        {productStore?.productDetail?.soLuong === 0 && (
                            <div className="text-red-700 mt-2">
                                <p>*Sản phẩm đã hết hàng</p>
                            </div>
                        )}
                    </div>

                    {/* Số lượng */}
                    <Setting_Number_Of_Products
                        handleChange={(numberOfProduct) => setNumberOfProduct(numberOfProduct)}
                    />

                    {/* Thông tin chi tiết sản phẩm*/}
                    <DetailProductInfo />

                    {/* Mô tả sản phẩm */}
                    <DetailProductDescription />
                </div>
            </div>
            <div className="my-2 p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">FAHASA GIỚI THIỆU</h3>
                {productStore?.products && productStore.products.length > 0 &&
                    <Product_List_DetailProduct products={productStore?.products?.filter((product) => product._id !== id).slice(0, 5)} />
                }
            </div>
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={handleModal}
            />
        </div>
    );
});

export default ProductDetail;