'use client';

import Pagination from '@/components/molecules/Pagination';
import Product_List from '@/components/organisms/Product_List';
import SlideBar_Product, { ListValue } from '@/components/organisms/SlideBar_Product';
import { useCategory, useFeature, useProduct } from '@/contexts/AppContext';
import scrollToTop from '@/utils/scroll_To_Top';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Products = observer(() => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryStore = useCategory();
    const featureStore = useFeature();
    const productStore = useProduct();

    const [isClient, setIsClient] = useState(false);
    const [totalPage, setTotalPage] = useState('1');

    // Lấy các giá trị từ URL
    const selectedCategory = searchParams.get('category') || 'all-categories';

    const selectedPrice = searchParams.get('price') || null;
    let priceValue = null;
    if (selectedPrice === '0-150000') priceValue = '0đ - 150,000đ';
    else if (selectedPrice === '150000-300000') priceValue = '150,000đ - 300,000đ';
    else if (selectedPrice === '300000-500000') priceValue = '300,000đ - 500,000đ';
    else if (selectedPrice === '500000-700000') priceValue = '500,000đ - 700,000đ';
    else if (selectedPrice === '700000-1000000000') priceValue = '700,000đ - Trở lên';

    const selectedSupplier = searchParams.get('supplier') || null;
    const selectedOrder = searchParams.get('orderBy') || 'Mới nhất';
    const selectedPage = searchParams.get('pageNum') || '1';
    console.log(selectedPage);
    const featuresQuery: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
        if (!['category', 'price', 'supplier', 'orderBy', 'pageNum'].includes(key)) {
            featuresQuery[key] = value;
        }
    });

    // Xử lý khi filter thay đổi
    const handleFilterChange = (filter: ListValue) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        // Cập nhật query danh mục
        if (filter.categoryId) currentParams.set('category', filter.categoryId);

        //Cập nhật query giá
        if (filter.price?.giaTri) currentParams.set('price', filter.price.giaTri);
        else if (filter.price?.tenTruyVan) currentParams.delete('price');

        //Cập nhật query nhà cung cấp
        if (filter.supplier?.giaTri) currentParams.set('supplier', filter.supplier.giaTri);
        else if (filter.supplier?.tenTruyVan) currentParams.delete('supplier');

        //Cập nhật query trang
        if (filter.page) currentParams.set('pageNum', filter.page);
        else currentParams.set('pageNum', '1');

        //Cập nhật query orderBy
        if (filter.orderBy) currentParams.set('orderBy', filter.orderBy);

        // Cập nhật các đặc trưng
        if (filter.featuresFilter?.giaTri) {
            currentParams.set(filter.featuresFilter.tenTruyVan, filter.featuresFilter.giaTri || '');
        }
        else if (filter.featuresFilter?.tenTruyVan) {
            currentParams.delete(filter.featuresFilter?.tenTruyVan)
        }
        scrollToTop();
        router.replace(`?${currentParams.toString()}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const query = {
                ...(selectedCategory !== "all-categories" && { category: selectedCategory }),
                ...(selectedPrice && { price: selectedPrice }),
                ...(selectedSupplier && { supplier: selectedSupplier }),
                ...(selectedOrder && { orderBy: selectedOrder }),
                ...(selectedPage && { pageNum: selectedPage }),
                ...featuresQuery,
            };
            // await categoryStore?.getCategories();
            const result = await productStore?.getProducts(query);
            if (result && result.totalPage) {
                setTotalPage(result.totalPage);
            }
        };
        fetchData();
        setIsClient(true);
    }, [searchParams]);

    return (
        <>
            {isClient
                ? (
                    <div className='flex items-start'>
                        {/* Sidebar */}
                        <div className='w-1/4 bg-white mr-4 p-2 pb-8 rounded-lg shadow text-sm'>
                            {categoryStore?.categories && (
                                <SlideBar_Product
                                    categories={categoryStore.categories}
                                    features={featureStore?.featureListValue || []}
                                    suppliers={featureStore?.supplierList || []}
                                    selectedCategory={selectedCategory}
                                    selectedPrice={priceValue}
                                    selectedSupplier={selectedSupplier}
                                    selectedFeatures={featuresQuery}
                                    handleFilter={handleFilterChange}
                                />
                            )}
                        </div>

                        <div className='w-3/4 bg-white py-4 rounded-lg shadow text-sm'>
                            {/* Sắp xếp */}
                            <div className="flex items-center mx-2 mb-2 py-4 border-b-2">
                                <h3 className='ml-6 text-base'>Sắp xếp theo : </h3>
                                <select
                                    value={selectedOrder}
                                    onChange={(e) => handleFilterChange({ orderBy: e.target.value })}
                                    className="border-2 rounded py-2 px-4 ml-2"
                                >
                                    <option value="Giá tăng dần">Giá tăng dần</option>
                                    <option value="Giá giảm dần">Giá giảm dần</option>
                                    <option value="A-Z">Từ A - Z</option>
                                    <option value="Z-A">Từ Z - A</option>
                                    <option value="Mới nhất">Mới nhất</option>
                                    <option value="Cũ nhất">Cũ nhất</option>
                                </select>
                            </div>

                            {/* Danh sách sách */}
                            {productStore?.products && productStore.products.length > 0
                                ? (
                                    <>
                                        <Product_List products={productStore.products} />
                                        {/* Phân trang */}
                                        <div className="flex justify-center mt-8">
                                            <Pagination
                                                setPagination={handleFilterChange}
                                                totalPage={totalPage}
                                                selectedPage={selectedPage || '1'}
                                            />
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
                    </div>
                )
                : (
                    <div>Đang tải...</div>
                )
            }
        </>
    );

});

export default Products;
