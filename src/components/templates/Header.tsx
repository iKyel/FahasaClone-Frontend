'use client';
import React, { useEffect, useState } from 'react'
import Button_Header from '../atoms/Button_Header'
import Banner_Sale from '../atoms/Banner_Sale'
import Search_Header from '../atoms/Search_Header'
import Logo from '../atoms/Logo'
import NavBar from '../organisms/NavBar'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='bg-[#FFFFFF]'>
            <Banner_Sale />

            <div className='w-5/6 relative mx-auto hidden md:block'>
                <div className='flex justify-start items-center'>
                    <div className='w-1/4'>
                        <Logo style='w-64' src='/images/fahasa-logo.png' />
                    </div>


                    <div className='w-full flex justify-between items-center'>
                        <NavBar />

                        <div className="w-2/3 p-3">
                            <Search_Header />
                        </div>

                        <div className="w-1/5 flex justify-around items-center py-2 text-center">
                            <Button_Header src="/images/header/ico_cart_gray.svg" text='Giỏ Hàng' style='mx-auto' id='cart' />
                            <Button_Header src='/images/header/ico_account_gray.svg' text='Khách Hàng' style='mx-auto' id='account' />
                        </div>
                    </div>

                </div>
            </div>

            <div className='mx-auto relative text-center bg-[#C92127] md:hidden'>
                <div className={`transition-all duration-1000 ${isScrolled ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                    <Logo style="w-36 mx-auto pt-2 transition-all duration-300" src="/images/fahasa-logo.png" />
                </div>

                <div className={`w-full z-50 flex justify-around items-center bg-[#C92127] transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 shadow-md' : 'sticky top-0'}`}>
                    <NavBar />

                    <div className="w-4/5 p-2">
                        <Search_Header />
                    </div>

                    <div className="w-1/6 flex justify-around items-center">
                        <Button_Header src="/images/header/ico_shopping_cart_white.svg" text='' style='w-8 mx-auto px-1' id='cart' />
                        <Button_Header src='/images/header/ico_thongtintk.svg' text='' style='w-7 mx-auto px-1' id='account' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header