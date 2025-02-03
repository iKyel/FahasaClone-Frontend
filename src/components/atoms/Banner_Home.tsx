import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import React from 'react'
import { Autoplay } from 'swiper/modules';

const slides = [
    '/images/banner/UuDai_T1_840x320.jpg',
    '/images/banner/thanhtoankhongtienmat_840x320.jpg',
    '/images/banner/Tuvi_840x320.jpg',
    '/images/banner/Boardgame0125_SlideBanner_840x320.jpg',
    '/images/banner/BlingboxT125_840X320_1.jpg'
]

const Banner_Home = () => {
    return (
        <div>
            <div className='flex space-x-2'>
                <div className='w-full md:w-2/3'>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000, // 3s
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="w-full h-full cursor-pointer"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={slide}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='hidden w-1/3 md:flex flex-col space-y-2 '>
                    <div>
                        <img src="/images/banner/UuDai_T1_392x156.jpg"
                            alt=""
                            className='object-contain rounded-lg cursor-pointer'
                        />
                    </div>

                    <div>
                        <img
                            src="/images/banner/ShopeeT1_392x156.png"
                            alt=""
                            className='object-contain rounded-lg cursor-pointer'
                        />
                    </div>
                </div>
            </div>

            <div className='hidden md:flex mt-4 items-center justify-between'>
                <div>
                    <img
                        src="/images/banner/LDPCTT1_flashsale_resize_310x210_2.png"
                        alt=""
                        className='object-contain rounded-lg cursor-pointer'
                    />
                </div>

                <div>
                    <img
                        src="/images/banner/NgoaiVan_T1_310x210.png"
                        alt=""
                        className='object-contain rounded-lg cursor-pointer'
                    />
                </div>

                <div>
                    <img
                        src="/images/banner/Alphabooks_KC_Resize_310x210.png"
                        alt=""
                        className='object-contain rounded-lg cursor-pointer'
                    />
                </div>

                <div>
                    <img
                        src="/images/banner/LDPTet2025_ResizeHomepage_310X210_1.png"
                        alt=""
                        className='object-contain rounded-lg cursor-pointer'
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner_Home