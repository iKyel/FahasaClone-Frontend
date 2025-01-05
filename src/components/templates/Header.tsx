import React from 'react'
import Button_Header from '../atoms/Button_Header'
import Banner_Sale from '../atoms/Banner_Sale'
import Search_Header from '../atoms/Search_Header'
import Logo from '../atoms/Logo'
import NavBar from '../organisms/NavBar'

const Header = () => {
    return (
        <div className='bg-[#FFFFFF]'>
            <Banner_Sale />

            <div className='w-5/6 relative mx-auto hidden md:block'>
                <div className='flex justify-start items-center'>
                    <Logo style='w-64' src='/images/fahasa-logo.png' />

                    <div className='w-full flex justify-between items-center'>
                        <NavBar />

                        <div className="w-2/3 p-3">
                            <Search_Header />
                        </div>

                        <div className="w-1/5 flex justify-around items-center py-2 pl-12">
                            <Button_Header src="/images/header/ico_cart_gray.svg" text='Giỏ Hàng' style='mx-auto' />
                            <Button_Header src='/images/header/ico_account_gray.svg' text='Khách Hàng' style='mx-auto' />
                        </div>
                    </div>

                </div>
            </div>

            <div className='mx-auto px-1 block text-center bg-[#C92127] md:hidden'>
                <Logo style='w-36 mx-auto pt-1' src='/images/fahasa-logo.png' />
                <div className='w-full flex justify-around items-center'>
                    <NavBar />

                    <div className="w-4/5 p-2">
                        <Search_Header />
                    </div>

                    <div className="w-1/6 flex justify-around items-center">
                        <Button_Header src="/images/header/ico_shopping_cart_white.svg" text='' style='w-8 mx-auto px-1' />
                        <Button_Header src='/images/header/ico_thongtintk.svg' text='' style='w-7 mx-auto px-1' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header