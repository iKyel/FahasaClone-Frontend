'use client'

import React, { useState } from 'react'
import Input_And_Label_First from '../molecules/Input_And_Label_Form_First'
import Input_And_Label from '../molecules/Input_And_Label_Form'
import Button_Submit_Form from '../molecules/Button_Submit_Form'
import { useUser } from '@/contexts/AppContext'
import { useRouter } from 'next/navigation'

const Login = () => {
    const userStore = useUser();
    const router = useRouter();

    const [form, setForm] = useState({
        userName: '',
        password: '',
    });
    const [error, setError] = useState('');

    //handleChange
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    //hasErrors
    const hasErrors = Object.values(form).some((item) => item === '');

    //handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasErrors) {
            const result: any = await userStore?.loginUser(form.userName, form.password);
            if (result) {
                if (result.user) {
                    router.push("/customer/profile");
                }
                else setError(result.message);
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='p-4'
        >
            <Input_And_Label_First
                type='text' text='Nhập tên đăng nhập'
                value={form.userName}
                placeholder='Nhập tên đăng nhập'
                id='userName'
                onChange={handleChange}
            />

            <Input_And_Label
                type='password'
                text='Mật khẩu'
                placeholder='Nhập mật khẩu'
                value={form.password}
                id='password'
                onChange={handleChange}
            />

            <div className='flex justify-end'>
                <span className='py-2 text-red-700 text-sm'>Quên mật khẩu?</span>
            </div>

            <Button_Submit_Form
                text='Đăng nhập'
                hasErrors={hasErrors}
            />

            {error && (<div className='flex justify-center mt-4'><p className="text-red-700 text-sm">{error}</p></div>)}
        </form>
    )
}

export default Login;