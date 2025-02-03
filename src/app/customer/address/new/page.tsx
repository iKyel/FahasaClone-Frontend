'use client'

import Modal from '@/components/atoms/Modal';
import Button_Submit_Form from '@/components/molecules/Button_Submit_Form';
import Input_And_Label_Profile from '@/components/molecules/Input_And_Label_Profile';
import { useUser } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Ward {
    Code: string;
    FullName: string;
    DistrictCode: string;
}

interface District {
    Code: string;
    FullName: string;
    ProvinceCode: string;
    Ward: Ward[];
}

interface Province {
    Code: string;
    FullName: string;
    District: District[];
}

const Create_Address = () => {
    const userStore = useUser();
    const router = useRouter();

    useEffect(() => {
        // Fetch data từ file JSON
        fetch('/vietnamese_provinces.json')
            .then((response) => response.json())
            .then((data: Province[]) => {
                setProvinces(data);
            });
    }, []);

    const [form, setForm] = useState({
        address: '',
    });

    const [errors, setErrors] = useState({
        address: '',
    });

    // state tỉnh, phường, xã
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);

    //Modal
    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);

    //handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        // Validation
        const newErrors = { ...errors };
        if (name === 'address') {
            const addressRegex = /^[a-zA-Z0-9À-ỹ\s,/]{1,50}$/;
            newErrors.address = addressRegex.test(value) ? '' : 'Chỉ có thể dùng chữ, số, dấu cách và trong khoảng 1 đến 50 kí tự';
        }
        setErrors(newErrors);
    };

    // handleProvinceChange
    const handleProvinceChange = (provinceCode: string) => {
        setSelectedProvince(provinceCode);
        const province = provinces.find((p) => p.FullName === provinceCode);
        setDistricts(province ? province.District : []);
        setSelectedDistrict(null);
        setWards([]);
    };

    // handleDistrictChange
    const handleDistrictChange = (districtCode: string) => {
        setSelectedDistrict(districtCode);
        const district = districts.find((d) => d.FullName === districtCode);
        setWards(district ? district.Ward : []);
    };

    // handleWardChange
    const handleWardChange = (wardCode: string) => {
        setSelectedWard(wardCode);
    }

    //Check Errors
    const hasErrors = Object.values(errors).some((error) => error !== '');

    //Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasErrors) {
            const address = `${form.address}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;
            const result = await userStore?.createAddress(address);
            if (result && result.message) {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
        }
    };

    //handleModal
    const handleModal = () => {
        setIsModalOpen(false);

        if (modalMessage === 'Thêm địa chỉ thành công!') {
            router.push('/customer/address');
        }
    }

    return (
        <div className='w-full p-4 bg-white rounded-lg'>
            <h3 className="text-lg">Thêm địa chỉ mới</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input_And_Label_Profile
                    type='text'
                    text='Địa chỉ'
                    placeholder='Nhập địa chỉ'
                    id='address'
                    value={form.address}
                    onChange={handleChange}
                />

                {errors.address && (
                    <p className="text-red-500 text-sm mt-1 text-center">{errors.address}</p>
                )}

                {/* Dropdown cho tỉnh thành, quận huyện, phường xã */}
                <div className="space-y-4 text-sm">
                    <div className='mt-4 mb-2 text-sm md:flex items-center'>
                        <label className="w-1/5 block pl-1 font-medium">Tỉnh/Thành</label>
                        <select
                            value={selectedProvince || ''}
                            onChange={(e) => handleProvinceChange(e.target.value)}
                            className="block px-4 w-2/3 h-10 rounded border shadow-sm"
                            required
                        >
                            <option value="">Chọn Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.Code} value={province.FullName}>
                                    {province.FullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='mt-4 mb-2 text-sm md:flex items-center'>
                        <label className="w-1/5 block pl-1 font-medium">Quận/Huyện</label>
                        <select
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            value={selectedDistrict || ''}
                            disabled={!selectedProvince}
                            className="block px-4 w-2/3 h-10 rounded border shadow-sm"
                            required
                        >
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option key={district.Code} value={district.FullName}>
                                    {district.FullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='mt-4 mb-2 text-sm md:flex items-center'>
                        <label className="w-1/5 block pl-1 font-medium">Phường/Xã</label>
                        <select
                            onChange={(e) => handleWardChange(e.target.value)}
                            value={selectedWard || ''}
                            disabled={!selectedDistrict}
                            className="block px-4 w-2/3 h-10 rounded border shadow-sm"
                            required
                        >
                            <option value="">Chọn Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.Code} value={ward.FullName}>
                                    {ward.FullName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <a className='hidden md:block mt-8 text-blue-500 text-sm hover:underline' href="/customer/address">Quay lại</a>
                    <Button_Submit_Form
                        text='Lưu địa chỉ'
                        hasErrors={hasErrors}
                    />
                </div>

            </form>
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={handleModal}
            />
        </div>
    )
}

export default Create_Address