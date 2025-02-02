'use client'

import Banner_Home from '@/components/atoms/Banner_Home'
import Product_List_5_Items from '@/components/atoms/Product_List_5_Items'
import Product_Outstanding from '@/components/atoms/Product_Outstanding'
import { observer } from 'mobx-react-lite'
import React from 'react'

const outstanding_list_1 = [
  { imageUrl: '/images/catehomepage/catehomepage_dochoi.png', name: 'Đồ chơi', categoryId: '6780ee9f29a4815a5e3dc391' },
  { imageUrl: '/images/catehomepage/catehomepage_dungcuhs.png', name: 'Dụng cụ học sinh', categoryId: '678e108aeba73ca76534e1a6' },
  { imageUrl: '/images/catehomepage/catehomepage_vanphongpham.png', name: 'Văn phòng phẩm', categoryId: '6780dfc65547812decc05bdf' },
  { imageUrl: '/images/catehomepage/catehomepage_bachhoaonline.png', name: 'Bách hóa online', categoryId: '678e118deba73ca76534e1b3' },
]

const outstanding_list_2 = [
  { imageUrl: '/images/catehomepage/catehomepage_thieunhi .png', name: 'Thiếu nhi', categoryId: '677fc20102c44b15ec07095a' },
  { imageUrl: '/images/catehomepage/catehomepage_manga.png', name: 'Manga - Comic', categoryId: '677fc23a02c44b15ec070962' },
  { imageUrl: '/images/catehomepage/catehomepage_ngoaivan.png', name: 'Ngoại văn', categoryId: '677fc22402c44b15ec07095e' },
  { imageUrl: '/images/catehomepage/catehomepage_tacphamkinhdien.png', name: 'Văn học kinh điển', categoryId: '6780e83429a4815a5e3dc2e8' },
]

const outstanding_list_3 = [
  { imageUrl: '/images/catehomepage/catehomepage_vanhoc.png', name: 'Văn học', categoryId: '677fc22402c44b15ec07095e' },
  { imageUrl: '/images/catehomepage/catehomepage_kinhte.png', name: 'Kinh tế', categoryId: '677fc25302c44b15ec070966' },
  { imageUrl: '/images/catehomepage/catehomepage_tamlykinang.png', name: 'Tâm lý kỹ năng', categoryId: '677fc23002c44b15ec070960' },
  { imageUrl: '/images/catehomepage/catehomepage_ngoaingu.png', name: 'Sách học ngoại ngữ', categoryId: '677fc24902c44b15ec070964' },
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
        categoryId={['679f26a8cc89f8a3538d64ac', '677fc20102c44b15ec07095a', '677fc23002c44b15ec070960']}
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
        categoryId={['677fc23a02c44b15ec070962', '6780ecf729a4815a5e3dc318', '6780ed0029a4815a5e3dc31b']}
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
        categoryId={['677fc2ab02c44b15ec070974', '677fc2b802c44b15ec070976', '677fc2c302c44b15ec070978']}
      />

      <Product_List_5_Items
        icon='/images/home/ico_goiy@3x.png'
        title='Làm đẹp - Sức khỏe'
        categoryId={['6780eea729a4815a5e3dc394', '678e13a7eba73ca76534e2a6']}
      />

    </div >
  )
});

export default Home
