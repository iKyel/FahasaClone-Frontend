'use client';

import React, { useState } from "react";
import { useUser } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import Modal from "@/components/atoms/Modal";
import Input_And_Label_Profile from "@/components/molecules/Input_And_Label_Profile";
import Button_Submit_Form from "@/components/molecules/Button_Submit_Form";

const ChangePassword = () => {
    const userStore = useUser();
    const router = useRouter();

    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

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

        if (name === 'oldPassword') {
            newErrors.oldPassword = '';
        }
        if (name === 'newPassword') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            // console.log(passwordRegex.test(value));
            newErrors.newPassword = passwordRegex.test(value) ? '' : 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số, không được dùng chữ tiếng việt';
        }
        if (name === 'confirmNewPassword' || name === 'newPassword') {
            newErrors.confirmNewPassword = value === form.newPassword ? '' : 'Nhập lại mật khẩu không khớp';
        }
        setErrors(newErrors);
    };

    //Check Errors
    const hasErrors = Object.values(errors).some((error) => error !== '');

    //handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasErrors) {
            const result = await userStore?.changePassword(form.oldPassword, form.newPassword);
            if (result && result.message) {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
        }
    }

    //handleModal
    const handleModal = async () => {
        setIsModalOpen(false);
        if (modalMessage === "Mật khẩu cũ bị sai, hãy nhập lại!") {
            setErrors({
                ...errors,
                oldPassword: modalMessage
            })
        }
        if (modalMessage === "Cập nhật mật khẩu thành công!") {
            router.push('/customer/profile');
        }
    }

    return (
        <div className="w-full p-4 bg-white rounded-lg">
            <h3 className="text-lg">Đổi mật khẩu</h3>
            <form onSubmit={handleSubmit}>
                <Input_And_Label_Profile
                    type='password'
                    text='Mật khẩu cũ'
                    placeholder='Nhập mật khẩu cũ'
                    id='oldPassword'
                    value={form.oldPassword}
                    onChange={handleChange}
                />
                {errors.oldPassword && (<p className="text-red-700 text-sm mt-1 text-center">{errors.oldPassword}</p>)}

                <Input_And_Label_Profile
                    type='password'
                    text='Mật khẩu mới'
                    placeholder='Nhập mật khẩu mới'
                    id='newPassword'
                    value={form.newPassword}
                    onChange={handleChange}
                />
                {errors.newPassword && (<p className="text-red-700 text-sm mt-1 text-center">{errors.newPassword}</p>)}

                <Input_And_Label_Profile
                    type='password'
                    text='Xác nhận mật khẩu'
                    placeholder='Xác nhận mật khẩu mới'
                    id='confirmNewPassword'
                    value={form.confirmNewPassword}
                    onChange={handleChange}
                />
                {errors.confirmNewPassword && (<p className="text-red-700 text-sm mt-1 text-center">{errors.confirmNewPassword}</p>)}

                <Button_Submit_Form
                    text='Lưu thay đổi'
                    hasErrors={hasErrors}
                />
            </form>
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={handleModal}
            />
        </div>



    );
};

export default ChangePassword;