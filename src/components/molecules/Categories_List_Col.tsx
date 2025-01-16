import React, { useState } from 'react'
import { ICategory } from '@/stores/categoryStore';

interface MyComponentProps {
    categories: ICategory[];
    selectedCategory: string;
    onClick: (id: string) => void;
}


const Categories_List_Col: React.FC<MyComponentProps> = ({ categories, selectedCategory, onClick }) => {
    // Lấy danh sách từ gốc đến danh mục hiện tại
    const getBreadcrumbPath = (id: string | null, categoryList: ICategory[]): ICategory[] => {
        if (!id) return [];
        for (const category of categoryList) {
            if (category._id === id) return [category];
            if (category.children) {
                const path = getBreadcrumbPath(id, category.children);
                if (path.length) return [category, ...path];
            }
        }
        return [];
    };

    // Xử lý khi bấm vào danh mục
    const handleCategoryClick = (categoryId: string) => {
        onClick(categoryId);
    };

    // Hiển thị danh mục từ gốc tới cha
    const renderCategories = (categoriesToRender: ICategory[]) => {
        return categoriesToRender.map((category, index) => (
            <div
                key={index}
                className={`pl-${index * 2} cursor-pointer hover:text-yellow-700 ${selectedCategory === category._id ? `text-yellow-400` : ``}`}
                onClick={() => handleCategoryClick(category._id)}
            >
                {category.ten}
            </div>
        ));
    };

    //Hiển thị danh mục con
    const renderSubCategories = (categoriesToRender: ICategory[], indentLevel: number) => {
        return categoriesToRender.map((category, index) => (
            <div
                key={index}
                className={`pl-${indentLevel * 2} cursor-pointer hover:text-yellow-700 py-1`}
                onClick={() => handleCategoryClick(category._id)}
            >
                {category.ten}
            </div>
        ));
    };

    // Lấy danh sách danh mục hiển thị
    //Lấy từ gốc tới cha
    const breadcrumbPath = getBreadcrumbPath(selectedCategory, categories || []);

    //Lấy thằng danh mục cha
    const lastCategory = breadcrumbPath[breadcrumbPath.length - 1];

    //Gán danh sách danh mục con
    const categoriesToRender = lastCategory?.children || categories;

    return (
        <div className='pb-1 border-b-2'>
            <div>
                <h3 className='font-bold mb-2'>NHÓM SẢN PHẨM</h3>
            </div>
            <div
                className={`cursor-pointer hover:text-yellow-700 ${selectedCategory === 'all-categories' ? `text-yellow-400` : ``}`}
                onClick={() => handleCategoryClick('all-categories')}
            >
                Tất cả nhóm sản phẩm
            </div>
            <div className="pl-2">
                {renderCategories(breadcrumbPath)}
                {categoriesToRender && renderSubCategories(categoriesToRender, breadcrumbPath.length)}
            </div>
        </div>

    )
};

export default Categories_List_Col