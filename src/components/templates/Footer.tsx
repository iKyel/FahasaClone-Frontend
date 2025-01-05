import React from 'react'
import Logo from '../atoms/Logo'
import Footer_Left from '../molecules/Footer_Left'
import Footer_Right from '../molecules/Footer_Right'

const Footer = () => {
    return (
        <div className='mx-auto p-4 rounded-md md:bg-[#FFFFFF] md:w-5/6'>
            <div className='md:flex md:justify-center'>
                <div className='md:w-1/3'>
                    <Footer_Left />
                </div>
                <div className='md:w-2/3'>
                    <Footer_Right />
                </div>
            </div>
            <div className='mt-2 text-center'>
                <p className='opacity-60 text-xs'>Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.</p>
            </div>
        </div>
    )
}

export default Footer