'use client';

import DetailProductDescription from "@/components/molecules/DetailProductDescription";
import DetailProductInfo from "@/components/molecules/DetailProductInfo";
import Setting_Number_Of_Products from "@/components/molecules/Setting_Number_Of_Products";
import Product_List_DetailProduct from "@/components/organisms/Product_List_DetailProduct";
import { useFeature, useProduct } from "@/contexts/AppContext";
import { observer } from "mobx-react-lite";
import React, { use, useEffect } from "react";

interface ProductDetailProps {
    params: Promise<{
        id: string;
    }>;
}

const ProductDetail: React.FC<ProductDetailProps> = observer(({ params }) => {
    const productStore = useProduct();
    const featureStore = useFeature();
    const { id } = use(params);

    useEffect(() => {
        const fetchData = async () => {
            await productStore?.getProductDetail(id);
            if (productStore?.productDetail?.danhMucId)
                await productStore?.getProducts({ category: productStore.productDetail?.danhMucId })
        }
        fetchData();
    }, [productStore])

    const giaGoc = productStore?.productDetail
        ? Math.round(productStore?.productDetail?.giaBan / (1 - (productStore?.productDetail?.khuyenMai ? productStore?.productDetail?.khuyenMai : 0) / 100))
        : 0;

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
                        <button className="w-1/2 mr-2 px-4 py-2 rounded-lg bg-white border-2 border-red-700 text-red-700">
                            Thêm vào giỏ hàng
                        </button>
                        <button className="w-1/2 ml-2 px-4 py-2 rounded-lg bg-red-700 text-white">
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
                        <h1 className="text-2xl mb-4">{productStore?.productDetail?.tenSP}</h1>

                        {/* Nhà cung cấp và thông tin */}
                        <div className="grid grid-cols-2 gap-x-56 mb-4 text-sm">
                            {featureStore?.supplier && (
                                <div className="flex">
                                    <p className="text-gray-800">Nhà cung cấp: </p>
                                    <p className="text-gray-900 font-bold">{featureStore?.supplier?.ten}</p>
                                </div>
                            )}

                            {featureStore?.featureValue?.map((feature, index) =>
                                ['Tác giả', 'Nhà xuất bản', 'Hình thức', 'Thương hiệu', 'Xuất xứ', 'Độ tuổi'].includes(feature.tenDT)
                                && (
                                    <div key={index} className="flex">
                                        <p className="text-gray-800">{feature.tenDT}:</p>
                                        <p className="text-gray-900 font-bold ml-2">{feature.giaTri}</p>
                                    </div>
                                ))
                            }

                        </div>

                        {/* Giá sản phẩm */}
                        <div className="flex items-center gap-4">
                            <p className="text-3xl font-bold text-red-700">
                                {productStore?.productDetail && productStore.productDetail.giaBan > 0 ? productStore?.productDetail?.giaBan.toLocaleString() : 0}₫
                            </p>
                            {productStore?.productDetail?.khuyenMai && (
                                <>
                                    <p className="text-base text-gray-500 line-through">
                                        {giaGoc > 0 ? giaGoc.toLocaleString() + '₫' : ''}
                                    </p>
                                    <p className="px-1 bg-red-700 rounded text-sm text-white font-bold">
                                        -{productStore.productDetail.khuyenMai > 0 ? productStore.productDetail.khuyenMai + '%' : ''}
                                    </p>
                                </>
                            )}


                        </div>
                    </div>

                    {/* Số lượng và nút Thêm vào giỏ */}
                    <Setting_Number_Of_Products />

                    {/* Thông tin chi tiết sản phẩm*/}
                    <DetailProductInfo />

                    {/* Mô tả sản phẩm */}
                    <DetailProductDescription />
                </div>
            </div>
            <div className="my-2 p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2">FAHASA GIỚI THIỆU</h3>
                {productStore?.products && productStore.products.length > 0 &&
                    <Product_List_DetailProduct products={productStore?.products?.filter((product) => product._id !== id).slice(0, 4)} />
                }
            </div>
        </div>
    );
});

export default ProductDetail;