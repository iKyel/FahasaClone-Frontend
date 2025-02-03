'use client';

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useUser } from "@/contexts/AppContext";
import Input_And_Label_Profile from "@/components/molecules/Input_And_Label_Profile";
import Button_Submit_Form from "@/components/molecules/Button_Submit_Form";
import Modal from "@/components/atoms/Modal";
import { UpdatedList } from "@/stores/userStore";

const ProfilePage = observer(() => {
    const userStore = useUser();

    let updatedList: UpdatedList = {}

    const [gioiTinh, setGioiTinh] = useState(userStore?.user?.gioiTinh || '')

    const oldForm = {
        hoDem: userStore?.user?.hoDem || '',
        ten: userStore?.user?.ten || '',
        sdt: userStore?.user?.sdt || '',
        email: userStore?.user?.email || '',
        gioiTinh: userStore?.user?.gioiTinh || '',
        ngaySinh: userStore?.user?.ngaySinh || ''
    };

    const [form, setForm] = useState({
        hoDem: userStore?.user?.hoDem || '',
        ten: userStore?.user?.ten || '',
        sdt: userStore?.user?.sdt || '',
        email: userStore?.user?.email || '',
        gioiTinh: userStore?.user?.gioiTinh || '',
        ngaySinh: userStore?.user?.ngaySinh || ''
    });

    const [errors, setErrors] = useState({
        hoDem: '',
        ten: '',
        sdt: '',
        ngaySinh: ''
    });

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    })

    //Modal
    const [modalMessage, setModalMessage] = useState('Có lỗi xảy ra');
    const [isModalOpen, setIsModalOpen] = useState(false);

    //handleChange
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        // Validation
        const newErrors = { ...errors };
        if (name === 'hoDem') {
            const usernameRegex = /^[a-zA-ZÀ-ỹ\s]{4,50}$/;
            newErrors.hoDem = usernameRegex.test(value) ? '' : 'Chỉ có thể dùng chữ, dấu cách và trong khoảng 4 đến 50 kí tự';
        }
        if (name === 'ten') {
            const usernameRegex = /^[a-zA-ZÀ-ỹ\s]{2,50}$/;
            newErrors.ten = usernameRegex.test(value) ? '' : 'Chỉ có thể dùng chữ, dấu cách và trong khoảng 2 đến 50 kí tự';
        }
        if (name === 'sdt') {
            const usernameRegex = /^[0-9]{9,11}$/;
            newErrors.sdt = usernameRegex.test(value) ? '' : 'Chỉ có thể dùng số trong khoảng 9 đến 11 kí tự';
        }
        if (name === 'ngaySinh') {
            const date = Date.parse(value)
            newErrors.ngaySinh = date < Date.now() ? '' : 'Ngày sinh vượt quá thời điểm hiện tại';
        }
        setErrors(newErrors);
        compareFields(oldForm, form)
    };

    //handleModal
    const handleModal = () => {
        setIsModalOpen(false);
    }

    //hasErrors
    const hasErrors = Object.values(errors).some((item) => item !== '');

    //compareFields
    function compareFields(obj1: UpdatedList, obj2: UpdatedList): boolean {
        for (const key in obj1) {
            if (Object.prototype.hasOwnProperty.call(obj1, key) &&
                Object.prototype.hasOwnProperty.call(obj2, key)) {
                const typedKey = key as keyof UpdatedList;
                if (obj1[typedKey] !== obj2[typedKey]) {
                    updatedList[typedKey] = obj2[typedKey];
                }
            }
        }
        return Object.keys(updatedList).length === 0;
    }

    //handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasErrors) {
            const result = await userStore?.updateUser(updatedList);
            if (result && result.message) {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
        }
    }

    return (
        <div>
            <div>
                <img src="/images/customer/background_silver.png" alt="" />
            </div>
            <div className="w-full mt-2 p-4 bg-white rounded-lg">
                <h3 className="text-lg">Hồ sơ cá nhân</h3>
                <form
                    onSubmit={handleSubmit}
                >
                    <Input_And_Label_Profile
                        type='text'
                        text='Họ đệm'
                        placeholder='Nhập họ đệm'
                        id='hoDem'
                        value={form.hoDem || ''}
                        onChange={handleChange}
                    />

                    {errors.hoDem && (<p className="text-red-700 text-sm mt-1 text-center">{errors.hoDem}</p>)}

                    <Input_And_Label_Profile
                        type='text'
                        text='Tên'
                        placeholder='Nhập tên'
                        id='ten'
                        value={form.ten || ''}
                        onChange={handleChange}
                    />

                    {errors.ten && (<p className="text-red-700 text-sm mt-1 text-center">{errors.ten}</p>)}

                    <div className="mt-4 mb-2 text-sm md:flex items-center">
                        <label htmlFor='username' className="md:w-1/5 w-full block pl-1 font-medium">
                            Tên đăng nhập
                        </label>
                        <input
                            type='text'
                            id='username'
                            value={userStore?.user?.userName || ''}
                            className="block px-4 w-2/3 h-10 rounded border shadow-sm bg-gray-200"
                            required
                            disabled
                        />
                    </div>

                    <Input_And_Label_Profile
                        type='text'
                        text='Số điện thoại'
                        placeholder='Nhập số điện thoại'
                        id='sdt'
                        value={form.sdt || ''}
                        onChange={handleChange}
                    />

                    {errors.sdt && (<p className="text-red-700 text-sm mt-1 text-center">{errors.sdt}</p>)}

                    <Input_And_Label_Profile
                        type='text'
                        text='Email'
                        placeholder='Nhập email'
                        id='email'
                        value={form.email || ''}
                        onChange={handleChange}
                    />

                    <div className="mt-4 mb-2 text-sm md:flex items-center">
                        <label className="w-1/5 block pl-1 font-medium">
                            Giới tính
                        </label>
                        <div className="w-2/3 flex items-center">
                            <div className="pr-4 py-2 flex items-center">
                                <input
                                    type='radio'
                                    id='male'
                                    name="gioiTinh"
                                    checked={gioiTinh === 'Nam'}
                                    value='Nam'
                                    onChange={(e) => {
                                        setForm({ ...form, gioiTinh: e.target.value });
                                        setGioiTinh(e.target.value);
                                    }}
                                    className="w-5 h-5 mr-2"
                                />
                                <label htmlFor="male">Nam</label>
                            </div>
                            <div className="px-4 flex items-center">
                                <input
                                    type='radio'
                                    id='female'
                                    name="gioiTinh"
                                    checked={gioiTinh === 'Nữ'}
                                    value='Nữ'
                                    onChange={(e) => {
                                        setForm({ ...form, gioiTinh: e.target.value });
                                        setGioiTinh(e.target.value);
                                    }}
                                    className="w-5 h-5 mr-2"
                                />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>
                    </div>

                    <Input_And_Label_Profile
                        type='date'
                        text='Ngày sinh'
                        placeholder='Nhập ngày sinh'
                        id='ngaySinh'
                        value={form.ngaySinh}
                        onChange={handleChange}
                    />
                    {errors.ngaySinh && (<p className="text-red-700 text-sm mt-1 text-center">{errors.ngaySinh}</p>)}

                    {isClient && <Button_Submit_Form
                        text='Lưu thay đổi'
                        hasErrors={hasErrors || compareFields(oldForm, form)}
                    />
                    }

                    <Modal
                        isOpen={isModalOpen}
                        modalMessage={modalMessage}
                        onClose={handleModal}
                    />
                </form>
            </div>
        </div>

    );
});

export default ProfilePage;
