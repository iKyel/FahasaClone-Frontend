import { IFeatureListValue } from '@/stores/featureStore';
import React from 'react';

interface FilterProps {
    filter: IFeatureListValue;
    selectedValue: string | null;
    onClick: (selectedValue: string | null, tenTruyVan: string) => void;
}

const Feature_Filter: React.FC<FilterProps> = ({ filter, selectedValue, onClick }) => {
    const handleSelection = (value: string) => {
        // Nếu giá trị được chọn trùng với giá trị đã chọn trước đó, bỏ chọn
        if (value === selectedValue) {
            onClick(null, filter.tenTruyVan);
        } else {
            onClick(value, filter.tenTruyVan);
        }
    };

    return (
        <div className="text-sm mt-2">
            {/* Tiêu đề bộ lọc */}
            <h3 className="font-bold text-gray-800 mb-2">{filter.ten.toUpperCase()}</h3>

            {/* Danh sách bộ lọc */}
            <ul className="ml-2 space-y-2 pb-2 border-b-2">
                {filter.dsGiaTri.map((value) => (
                    <li key={value} className="flex items-center">
                        <button
                            onClick={() => handleSelection(value)}
                            className={`w-4 h-4 border-2 rounded-sm flex justify-center items-center mr-3 ${selectedValue === value
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-400 bg-white'
                                }`}
                        >
                            {selectedValue === value && (
                                <i className="fa-solid fa-check text-white"></i>
                            )}
                        </button>
                        <span>{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feature_Filter;
