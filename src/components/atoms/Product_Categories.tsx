import Link from 'next/link'
import React from 'react'

const listProductCategories = [
    { imageUrl: '/images/categories/1890000035459-removebg-preview.png', href: '/products?category=678e12b3eba73ca76534e234', name: 'Thú bông' },
    { imageUrl: '/images/categories/3900000176590-_8__1-removebg-preview.png', href: '/products?category=678e119aeba73ca76534e1b9', name: 'Bao lì xì' },
    { imageUrl: '/images/categories/image_233034-removebg-preview.png', href: '/products?category=678e1195eba73ca76534e1b6', name: 'Đèn chống cận' },
    { imageUrl: '/images/categories/tashiro_3_ao_toai.jpg', href: '/products?category=677fc28502c44b15ec070970', name: 'Đam mỹ' },
    { imageUrl: '/images/categories/kinhte-1.jpg', href: '/products?category=6780ed6729a4815a5e3dc348', name: 'Bài học kinh doanh' },
    { imageUrl: '/images/categories/8935244874389.jpg', href: '/products?category=677fc22402c44b15ec07095e', name: 'Văn học' },
    { imageUrl: '/images/categories/atomichabit100x100.jpg', href: '/products?category=677fc23002c44b15ec070960', name: 'Tâm lý kỹ năng' },
    { imageUrl: '/images/categories/bup-sen-xanh-100x100.png', href: '/products?category=677fc20102c44b15ec07095a', name: 'Thiếu nhi' },
    { imageUrl: '/images/categories/hsk100x100.jpg', href: '/products?category=677fc24902c44b15ec070964', name: 'Sách học ngoại ngữ' },
    { imageUrl: '/images/categories/ngoai-van-t1-24(1).jpg', href: '/products?category=6780ed4729a4815a5e3dc339', name: 'Ngoại văn' },
]

const Product_Categories = () => {
    return (
        <div className='mt-4 p-4 bg-white rounded-lg'>
            <div className='pb-4 border-b-2 flex items-center'>
                <img src="/images/home/ico_menu_red.svg" alt="" />
                <p className='ml-2 text-xl font-bold'>Danh mục sản phẩm</p>
            </div>
            <div className='py-4 flex justify-between'>
                {
                    listProductCategories.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <div
                                className=' text-gray-700 cursor-pointer flex flex-col items-center'
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className='object-contain'
                                />
                                <p className='mt-2 w-28 text-center hover:text-red-700'>{item.name}</p>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}

export default Product_Categories