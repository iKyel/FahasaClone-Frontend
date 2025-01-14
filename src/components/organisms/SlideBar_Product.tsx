'use client';


import React from 'react';
import Categories_List_Col from '../molecules/Categories_List_Col';
import { IFeatureListValue, ISupplier } from '@/stores/featureStore';
import Feature_Filter from '../molecules/Feature_Filter';
import { ICategory } from '@/stores/categoryStore';
import Supplier_Filter from '../molecules/Supplier_Filter';

export interface ListValue {
    categoryId?: string | null;
    price?: { tenTruyVan: string; giaTri: string | null } | null;
    supplier?: { tenTruyVan: string; giaTri: string | null } | null;
    page?: string | null;
    orderBy?: string | null;
    searchName?: string | null;
    featuresFilter?: { tenTruyVan: string; giaTri: string | null } | null;
}

interface MyComponentProps {
    categories: ICategory[];
    features: IFeatureListValue[];
    suppliers: ISupplier[] | null;
    selectedCategory: string;
    selectedPrice: string | null;
    selectedSupplier: string | null;
    selectedFeatures: Record<string, string | null>;
    handleFilter: (filter: ListValue) => void;
}

const SlideBar_Product: React.FC<MyComponentProps> =
    ({ categories, features, suppliers, selectedCategory, selectedPrice, selectedSupplier, selectedFeatures, handleFilter }) => {
        const filterPrice = {
            _id: 'gia',
            ten: 'Giá',
            tenTruyVan: 'price',
            dsGiaTri: ['0đ - 150,000đ', '150,000đ - 300,000đ', '300,000đ - 500,000đ', '500,000đ - 700,000đ', '700,000đ - Trở lên'],
        }

        // Xử lý khi thay đổi đặc trưng
        const handleFilterFeature = (selectedValue: string | null, tenTruyVan: string) => {
            handleFilter({
                featuresFilter: { tenTruyVan: tenTruyVan, giaTri: selectedValue },
            });
        };

        // Xử lý khi thay đổi danh mục
        const handleFilterCategory = (selectedValue: string) => {
            handleFilter({
                categoryId: selectedValue,
            });
        };

        //Xử lý khi thay đổi giá
        const handleFilterPrice = (selectedValue: string | null, tenTruyVan: string) => {
            let priceValue = null;
            if (selectedValue === '0đ - 150,000đ') priceValue = '0-150000';
            else if (selectedValue === '150,000đ - 300,000đ') priceValue = '150000-300000';
            else if (selectedValue === '300,000đ - 500,000đ') priceValue = '300000-500000';
            else if (selectedValue === '500,000đ - 700,000đ') priceValue = '500000-700000';
            else if (selectedValue === '700,000đ - Trở lên') priceValue = '700000-1000000000';
            handleFilter({
                price: { tenTruyVan: tenTruyVan, giaTri: priceValue }
            });
        };

        //Xử lý thay đổi nhà cung cấp
        const handleFilterSupplier = (selectedValue: string | null, tenTruyVan: string) => {
            handleFilter({
                featuresFilter: { tenTruyVan: tenTruyVan, giaTri: selectedValue },
            });
        };

        return (
            <div className="w-full py-2 bg-white">
                {/* Danh sách danh mục */}
                {categories && (
                    <Categories_List_Col
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onClick={handleFilterCategory}
                    />
                )}

                {/* Bộ lọc đặc trưng */}
                <div className="mt-2">
                    <Feature_Filter
                        filter={filterPrice}
                        selectedValue={selectedPrice}
                        onClick={handleFilterPrice}
                    />
                    <Supplier_Filter
                        filter={suppliers}
                        selectedValue={selectedSupplier}
                        onClick={handleFilterSupplier}
                    />
                    {features &&
                        features.map((feature, index) => (
                            <Feature_Filter
                                key={index}
                                filter={feature}
                                selectedValue={selectedFeatures[feature.tenTruyVan] || ''}
                                onClick={handleFilterFeature}
                            />
                        ))}
                </div>
            </div>
        );
    };

export default SlideBar_Product;
