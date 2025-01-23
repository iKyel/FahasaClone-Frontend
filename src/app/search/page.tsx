'use client'
import Pagination from '@/components/molecules/Pagination';
import Product_List_DetailProduct from '@/components/organisms/Product_List_DetailProduct';
import { ListValue } from '@/components/organisms/SlideBar_Product';
import { useProduct } from '@/contexts/AppContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchProduct = observer(() => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productStore = useProduct();

    const [totalPage, setTotalPage] = useState('1');

    // Lấy các giá trị từ URL
    const searchName = searchParams.get('searchName') || '';
    const pageNum = searchParams.get('pageNum') || '1';

    // Xử lý khi filter thay đổi
    const handleFilterChange = (filter: ListValue) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        console.log(searchParams.toString());
        // Cập nhật query danh mục
        if (filter.searchName) currentParams.set('searchName', filter.searchName);

        //Cập nhật query trang
        if (filter.page) currentParams.set('pageNum', filter.page);

        router.replace(`?${currentParams.toString()}`);
    };


    useEffect(() => {
        const fetchData = async () => {
            const result = await productStore?.getProductsByName(searchName, pageNum);
            if (result && result.totalPage) {
                setTotalPage(result.totalPage);
            }
        }
        fetchData();
    }, [searchParams])
    return (
        <div className='bg-white p-4 rounded-lg shadow text-sm'>
            <h3 className='text-lg mb-4'>Kết quả tìm kiếm: <span className='p-1 bg-gray-200 rounded-lg'>{searchName}</span></h3>

            {/* Danh sách sách tìm kiếm */}
            {productStore?.products && productStore.products.length > 0
                ? (
                    <>
                        <Product_List_DetailProduct products={productStore?.products} />
                        {/* Phân trang */}
                        <div className="flex justify-center mt-4">
                            <Pagination setPagination={handleFilterChange} totalPage={totalPage} selectedPage={pageNum || '1'} />
                        </div>
                    </>
                )
                : (
                    <div className='p-2'>
                        <p className='p-4 bg-yellow-200 border-yellow-500 border-2 font-bold'>Không tìm thấy sản phẩm phù hợp nào !</p>
                    </div>
                )
            }
        </div>
    )
});

export default SearchProduct