'use client'

import { useFeature, useProduct } from '@/contexts/AppContext'
import { observer } from 'mobx-react-lite';
import React from 'react'
import DetailProductInfoProps from '../atoms/DetailProductInfoProps';

const DetailProductInfo = observer(() => {
    const productStore = useProduct();
    const featureStore = useFeature();

    return (
        <div className='my-2 p-4 rounded-lg bg-white'>
            <h3 className="text-lg font-bold mb-4">Thông tin chi tiết</h3>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <tbody>
                        <DetailProductInfoProps
                            featureName='Mã hàng'
                            value={productStore?.productDetail?._id}
                        />
                        <DetailProductInfoProps
                            featureName='Tên nhà cung cấp'
                            value={productStore?.productDetail?.tenSP}
                        />
                        {featureStore?.featureValue?.map((item, index) => (
                            <DetailProductInfoProps
                                key={index}
                                featureName={item.tenDT}
                                value={item.giaTri}
                            />
                        ))}
                        <DetailProductInfoProps
                            featureName='Trọng lượng'
                            value={productStore?.productDetail?.trongLuong}
                        />
                        {productStore?.productDetail?.kichThuoc && (
                            <DetailProductInfoProps
                                featureName='Kích thước bao bì'
                                value={productStore?.productDetail?.kichThuoc.dai + ' x ' + productStore?.productDetail?.kichThuoc.rong + ' x ' + productStore?.productDetail?.kichThuoc.cao + " cm"}
                            />
                        )}
                    </tbody>
                </table>
            </div>

            <p className='mt-4 text-sm'>Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành.
                Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như:
                Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...
            </p>
            <p className='text-sm text-red-700'>
                Chính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc
            </p>
        </div>
    )
});

export default DetailProductInfo