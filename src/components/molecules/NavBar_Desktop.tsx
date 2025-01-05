"use client";

import React, { useState } from 'react'

const NavBar_Desktop = () => {
    const categories = [
        {
            id: '1',
            name: "Sách Trong Nước",
            groupNames: ["Văn học", "Kinh tế", "Tâm lý - Kĩ năng sống", "Nuôi dạy con"],
            groups: [
                ["Văn học A", "Văn học B", "Văn học C", "Văn học D", "Xem tất cả"],
                ["Kinh tế A", "Kinh tế B", "Kinh tế C", "Kinh tế D", "Xem tất cả"],
                ["Tâm lý A", "Tâm lý B", "Tâm lý C", "Tâm lý D", "Xem tất cả"],
                ["Nuôi dạy A", "Nuôi dạy B", "Nuôi dạy C", "Nuôi dạy D", "Xem tất cả"],
            ],
        },
        {
            id: '2',
            name: "Laptop",
            groupNames: ["MacBook", "Dell", "HP", "Lenovo"],
            groups: [
                ["MacBook A", "MacBook B", "MacBook C", "MacBook D", "Xem tất cả"],
                ["Dell A", "Dell B", "Dell C", "Dell D", "Xem tất cả"],
                ["HP A", "HP B", "HP C", "HP D", "Xem tất cả"],
                ["Lenovo A", "Lenovo B", "Lenovo C", "Lenovo D", "Xem tất cả"],
            ],
        },
    ];

    const [isHovered, setIsHovered] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].id);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setActiveCategory('1');
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
        setActiveCategory(null);
    };

    const handleCategoryHover = (categoryId: string) => {
        setActiveCategory(categoryId);
    };


    return (
        <div className='hidden md:block'>
            <div className="flex justify-center items-center pl-16 py-3"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span>
                    <img src="/images/header/ico_menu.svg" alt="" />
                </span>
                <span>
                    <img src="/images/header/icon_seemore_gray.svg" alt="" />
                </span>

                {/* Danh mục sản phẩm */}
                {isHovered && (
                    <div className="absolute top-16 right-0 w-full h-screen p-2 bg-white border rounded">
                        <div className="flex">
                            {/* Danh sách danh mục bên trái */}
                            <div className="w-1/4 border-r p-2">
                                <h3 className="text-2xl font-bold opacity-60 p-4">Danh mục sản phẩm</h3>
                                <ul>
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className={`p-4 cursor-pointer rounded-lg hover:bg-gray-200 font-bold ${activeCategory === category.id ? "bg-gray-200" : ""}`}
                                            onMouseEnter={() => handleCategoryHover(category.id)}
                                        >
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Danh sách nhóm sản phẩm bên phải */}
                            <div className="w-3/4 p-2">
                                {categories.map((category) =>
                                    activeCategory === category.id && (
                                        <div key={category.id}>
                                            <div>
                                                <h3 className="text-2xl font-bold p-4">{category.name}</h3>
                                            </div>

                                            <div className="grid grid-cols-4 gap-4">
                                                {category.groupNames.map((groupName, index) => (
                                                    <div key={index}>
                                                        <h3 className="font-semibold">{groupName}</h3>
                                                        <ul>
                                                            {category.groups[index].map(
                                                                (item, idx) => (
                                                                    <li key={idx} className="cursor-pointer hover:bg-gray-200">
                                                                        {item}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar_Desktop