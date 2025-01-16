'use client';

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/contexts/AppContext';
import { observer } from 'mobx-react-lite';
import Modal_YesNo from '../atoms/Modal_YesNo';
import Li_Link from '../atoms/Li_Link';
import Name_User_Profile from '../atoms/Name_User_Profile';

const Sidebar = observer(() => {
    const router = useRouter()
    const userStore = useUser();
    const pathname = usePathname();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hrefSite, setHrefSite] = useState(pathname);

    const navItems = [
        { label: "Hồ sơ cá nhân", href: "/customer/profile", icon: "fa-regular fa-user fa-xl text-black" },
        { label: "Sổ địa chỉ", href: "/customer/address", icon: 'fa-regular fa-address-book fa-xl text-black' },
        { label: "Đổi mật khẩu", href: "/customer/changepassword", icon: 'fa-solid fa-key fa-xl text-black' },
        { label: "Đơn hàng của tôi", href: "/customer/orders", icon: 'fa-regular fa-rectangle-list fa-xl text-black' },
        { label: "Sản phẩm yêu thích", href: "/customer/wishlist", icon: 'fa-regular fa-heart fa-xl text-black' },
        { label: "Nhận xét của tôi", href: "/customer/mycomment", icon: 'fa-regular fa-star fa-xl text-black' },
    ];

    //handleIndexSite
    const handleIndexSite = (path: string) => {
        setHrefSite(path);
    }

    //handleModal
    const handleModal = async () => {
        const result: any = await userStore?.logout();
        if (result && result.message) {
            router.push('/login_signin');
        }
    }

    return (
        <div className="w-1/4 bg-white mr-4 px-4 py-6 rounded-lg shadow ">
            <Name_User_Profile />

            <ul className="space-y-4 mt-2 text-sm">
                {navItems.map((item, index) => (
                    <Li_Link
                        key={index}
                        href={item.href}
                        text={item.label}
                        icon={item.icon}
                        inSite={hrefSite === item.href}
                        onClick={handleIndexSite}
                    />
                ))}
                <li>
                    <a className="block py-2 px-4 rounded-md hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        Đăng xuất
                    </a>
                </li>
            </ul>

            <Modal_YesNo
                isOpen={isModalOpen}
                modalMessage={"Bạn có muốn thoát không?"}
                onConfirm={handleModal}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
});

export default Sidebar
