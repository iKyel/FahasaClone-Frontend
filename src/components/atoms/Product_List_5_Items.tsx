import { useCategory, useProduct } from '@/contexts/AppContext';
import { ICategory } from '@/stores/categoryStore';
import { IProduct } from '@/stores/productStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface MyComponentProps {
    icon: string;
    title: string;
    categoryId: string[];
}

const Product_List_5_Items: React.FC<MyComponentProps> = ({ categoryId, title, icon }) => {
    const router = useRouter();
    const productStore = useProduct();
    const categoryStore = useCategory();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCat, setSelectedCat] = useState(categoryId[0]);

    const ITEMS_PER_PAGE = typeof window !== "undefined" && window.innerWidth >= 768 ? 5 : 2;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result_cat = await Promise.all(categoryId.map((item) => categoryStore?.getCategoriesById(item)));
            const categoriesList = result_cat.map((item) => item.category);
            if (categoriesList) {
                setCategories(categoriesList);
            }
            const result = await productStore?.getProducts({ category: selectedCat });
            if (result && result.products) {
                setProducts(result.products);
            }
        };
        fetchData();
    }, [selectedCat]);

    const handleNext = () => {
        if (products && currentIndex + ITEMS_PER_PAGE < products.length - ITEMS_PER_PAGE) {
            setCurrentIndex((prevIndex) => prevIndex + ITEMS_PER_PAGE);
        }
        else {
            setCurrentIndex(products.length - ITEMS_PER_PAGE);
        }
    };

    const handlePrev = () => {
        if (currentIndex - ITEMS_PER_PAGE >= 0) {
            setCurrentIndex((prevIndex) => prevIndex - ITEMS_PER_PAGE);
        }
        else {
            setCurrentIndex(0);
        }
    };

    return (
        <div className='mt-4 bg-white rounded-lg'>
            <div className='pl-4 py-4 flex items-center'>
                <img src={icon} alt='icon' className='w-6 h-6 mr-2' />
                <h3 className='text-xl font-bold'>{title}</h3>
            </div>
            <div className='flex items-center justify-start border-b-2 space-x-8'>
                {categories.map((category, index) =>
                (category && (
                    <div
                        onClick={() => setSelectedCat(category._id)}
                        key={index}
                        className={`text-sm font-bold cursor-pointer ml-4 py-2 ${selectedCat === category._id ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-700'}`}
                    >
                        {category.ten}
                    </div>
                ))

                )}
            </div>
            <div className='relative p-5 w-full'>
                <div className="overflow-hidden overflow-x-visible lg:overflow-x-hidden">
                    <div
                        className="flex transition-transform duration-500 md:justify-start md:space-x-4"
                        style={{
                            transform: `translate3d(-${typeof window !== "undefined" ? window.innerWidth / 25 * 4 * currentIndex : 0}px, 0, 0)`,
                            width: `${(products.length / ITEMS_PER_PAGE) * 100}%`, // Tổng chiều rộng
                        }}
                    >
                        {products?.map((product) => (
                            <div
                                key={product._id}
                                className="w-full p-2 rounded-lg hover:shadow-lg outline outline-transparent hover:outline-2 hover:outline-gray-200 transition duration-300"
                                onClick={() => router.push(`/products/${product._id}`)}
                            >
                                <div className='relative'>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.tenSP}
                                        className="w-full h-56 object-contain mb-2 rounded"
                                    />

                                    {/* Hết hàng */}
                                    {product.soLuong === 0 && (
                                        <span className="absolute top-0 left-0 h-6 w-24 bg-red-300 text-red-700 text-sm font-bold p-2 flex items-center justify-center">
                                            Hết hàng
                                        </span>
                                    )}
                                </div>

                                <div className='h-12 my-2 text-sm'>
                                    <h3>{product.tenSP && product.tenSP.length > 28 ? product.tenSP.slice(0, 28) + '...' : product.tenSP}</h3>
                                </div>

                                <div className='h-12 my-2'>
                                    <div className='flex items-center text-center'>
                                        <p className='font-bold text-lg text-red-700'>
                                            {product.giaBan ? Math.round(product.giaBan * (1 - product.khuyenMai / 100)).toLocaleString() : '0'}₫
                                        </p>
                                        {product.khuyenMai > 0 && (
                                            <span className='ml-3 p-1 rounded-md text-sm bg-red-700 text-white '>
                                                -{product.khuyenMai}%
                                            </span>
                                        )}
                                    </div>

                                    {product.khuyenMai > 0 && (
                                        <p className='line-through text-gray-600'>
                                            {product.giaBan.toLocaleString()}₫
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <div
                        className={`${currentIndex === 0 || products.length < 6 ? 'hidden' : 'block'} absolute top-1/2 -translate-y-1/2 -left-4 bg-white px-4 py-2 rounded-full shadow-lg`}
                        onClick={handlePrev}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </div>
                    <div className={`${currentIndex === products.length - 5 || products.length < 6 ? 'hidden' : 'block'} absolute top-1/2 -translate-y-1/2 -right-4  bg-white px-4 py-2 rounded-full shadow-lg`}
                        onClick={handleNext}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </div>

                </div>
            </div>
            <div className='flex justify-center items-center pb-4'>
                <button
                    className='border-2 border-red-700 text-red-700 py-2 px-20 rounded-lg'
                    onClick={() => { router.push(`/products?category=${selectedCat}`) }}
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default Product_List_5_Items;
