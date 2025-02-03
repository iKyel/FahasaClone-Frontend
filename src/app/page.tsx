'use client'

import Banner_Home from '@/components/atoms/Banner_Home'
import Product_List_5_Items from '@/components/atoms/Product_List_5_Items'
import Product_Outstanding from '@/components/atoms/Product_Outstanding'
import { observer } from 'mobx-react-lite'
import React from 'react'

const outstanding_list_1 = [
  { imageUrl: '/images/catehomepage/catehomepage_dochoi.png', name: 'Đồ chơi', categoryId: '679f26b9cc89f8a3538d64b5' },
  { imageUrl: '/images/catehomepage/catehomepage_dungcuhs.png', name: 'Dụng cụ học sinh', categoryId: '679f31bc950c2777935e946f' },
  { imageUrl: '/images/catehomepage/catehomepage_vanphongpham.png', name: 'Văn phòng phẩm', categoryId: '679f26b5cc89f8a3538d64b2' },
  { imageUrl: '/images/catehomepage/catehomepage_bachhoaonline.png', name: 'Bách hóa online', categoryId: '679f26c1cc89f8a3538d64bb' },
]

const outstanding_list_2 = [
  { imageUrl: '/images/catehomepage/catehomepage_thieunhi .png', name: 'Thiếu nhi', categoryId: '679f26d5cc89f8a3538d64c1' },
  { imageUrl: '/images/catehomepage/catehomepage_manga.png', name: 'Manga - Comic', categoryId: '679f26e4cc89f8a3538d64ca' },
  { imageUrl: '/images/catehomepage/catehomepage_ngoaivan.png', name: 'Ngoại văn', categoryId: '679f26accc89f8a3538d64af' },
  { imageUrl: '/images/catehomepage/catehomepage_tacphamkinhdien.png', name: 'Văn học kinh điển', categoryId: '679f308c950c2777935e93fd' },
]

const outstanding_list_3 = [
  { imageUrl: '/images/catehomepage/catehomepage_vanhoc.png', name: 'Văn học', categoryId: '679f26dfcc89f8a3538d64c7' },
  { imageUrl: '/images/catehomepage/catehomepage_kinhte.png', name: 'Kinh tế', categoryId: '679f2701cc89f8a3538d64d7' },
  { imageUrl: '/images/catehomepage/catehomepage_tamlykinang.png', name: 'Tâm lý kỹ năng', categoryId: '679f26efcc89f8a3538d64cd' },
  { imageUrl: '/images/catehomepage/catehomepage_ngoaingu.png', name: 'Sách học ngoại ngữ', categoryId: '679f26f6cc89f8a3538d64d0' },
]

const Home = observer(() => {

  return (
    <div className='md:my-4 space-y-4'>
      <Banner_Home />

      {/* <Product_Categories /> */}

      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        {outstanding_list_1.map((item, index) => (
          <Product_Outstanding
            list={item}
            key={index}
          />
        ))}
      </div>

      <Product_List_5_Items
        icon='/images/home/ico_sachtrongnuoc.svg'
        title='Sách Tiếng Việt'
        categoryId={['679f26d5cc89f8a3538d64c1', '679f26d9cc89f8a3538d64c4', '679f26dfcc89f8a3538d64c7']}
      />

      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        {outstanding_list_2.map((item, index) => (
          <Product_Outstanding
            list={item}
            key={index}
          />
        ))}
      </div>

      <Product_List_5_Items
        icon='/images/home/icon_ManngaT06.png'
        title='Manga - Comic'
        categoryId={['679f30af950c2777935e9406', '679f30b8950c2777935e9409', '679f30d8950c2777935e9415']}
      />

      <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
        {outstanding_list_3.map((item, index) => (
          <Product_Outstanding
            list={item}
            key={index}
          />
        ))}
      </div>

      <Product_List_5_Items
        icon='/images/home/Icon_SachThieuNhi_120x120.png'
        title='Truyện thiếu nhi'
        categoryId={['679f2762cc89f8a3538d6543', '679f2766cc89f8a3538d6546', '679f276ecc89f8a3538d6549']}
      />

      <Product_List_5_Items
        icon='/images/home/ico_goiy@3x.png'
        title='Làm đẹp - Sức khỏe'
        categoryId={['679f26c8cc89f8a3538d64be']}
      />

    </div >
  )
});

export default Home
