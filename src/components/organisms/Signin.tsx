'use client';

import React, { useState } from 'react'
import Input_And_Label_Form_First from '../molecules/Input_And_Label_Form_First'
import Input_And_Label_Form from '../molecules/Input_And_Label_Form'
import Button_Submit_Form from '../molecules/Button_Submit_Form'
import { useUser } from '@/contexts/AppContext'
import Modal from '../atoms/Modal'

interface MyComponentProps {
    handleNav: (data: boolean) => void;
}

const Signin: React.FC<MyComponentProps> = ({ handleNav }) => {
    const userStore = useUser();

    const [form, setForm] = useState({
        hoDem: '',
        ten: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        hoDem: '',
        ten: '',
        userName: '',
        password: '',
        confirmPassword: ''
    });

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
        if (name === 'userName') {
            const usernameRegex = /^[a-zA-Z0-9]{4,50}$/;

            newErrors.userName = usernameRegex.test(value) ? '' : 'Chỉ có thể dùng chữ thường, chữ in hoa hoặc số trong khoảng 4 đến 50 kí tự, không dùng chữ tiếng Việt';
        }
        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            // console.log(passwordRegex.test(value));
            newErrors.password = passwordRegex.test(value) ? '' : 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số, không được dùng chữ tiếng việt';
        }
        if (name === 'confirmPassword' || name === 'password') {
            newErrors.confirmPassword = value === form.password ? '' : 'Nhập lại mật khẩu không khớp';
        }
        setErrors(newErrors);
    };

    //handleModal
    const handleModal = () => {
        setIsModalOpen(false);

        if (modalMessage === 'Đăng ký thành công') {
            handleNav(true);
        }
        else if (modalMessage === 'Tên đăng nhập đã tồn tại. Hãy dùng tên khác!') {
            setErrors({
                ...errors,
                userName: modalMessage
            });
        }
    }

    //hasErrors
    const hasErrors = Object.values(errors).some((item) => item !== '');

    //handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasErrors) {
            const result = await userStore?.singinUser(form.hoDem, form.ten, form.userName, form.password);
            if (result) {
                setModalMessage(result.message);
                setIsModalOpen(true);
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='p-4'
        >
            <Input_And_Label_Form_First
                type='text'
                text='Họ đệm'
                placeholder='Nhập họ đệm'
                id='hoDem'
                value={form.hoDem}
                onChange={handleChange}
            />

            {errors.hoDem && (<p className="text-red-700 text-sm mt-1">{errors.hoDem}</p>)}

            <Input_And_Label_Form
                type='text'
                text='Tên'
                placeholder='Nhập tên'
                id='ten'
                value={form.ten}
                onChange={handleChange}
            />

            {errors.ten && (<p className="text-red-700 text-sm mt-1">{errors.ten}</p>)}

            <Input_And_Label_Form
                type='text'
                text='Tên đăng nhập'
                placeholder='Nhập tên đăng nhập'
                id='userName'
                value={form.userName}
                onChange={handleChange}
            />

            {errors.userName && (<p className="text-red-700 text-sm mt-1">{errors.userName}</p>)}

            <Input_And_Label_Form
                type='password'
                text='Mật khẩu'
                placeholder='Nhập mật khẩu'
                id='password'
                value={form.password}
                onChange={handleChange}
            />

            {errors.password && (<p className="text-red-700 text-sm mt-1">{errors.password}</p>)}

            <Input_And_Label_Form
                type='password'
                text='Xác nhận mật khẩu'
                placeholder='Xác nhận mật khẩu'
                id='confirmPassword'
                value={form.confirmPassword}
                onChange={handleChange}
            />

            {errors.confirmPassword && (<p className="text-red-700 text-sm mt-1">{errors.confirmPassword}</p>)}

            <Button_Submit_Form
                text='Đăng kí'
                hasErrors={hasErrors}
            />
            <Modal
                isOpen={isModalOpen}
                modalMessage={modalMessage}
                onClose={handleModal}
            />
        </form>
    )
}

export default Signin