import api from "@/utils/axios_catch_error_token";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { destroyCookie } from "nookies";


export interface IUser {
    _id: string;
    hoDem: string;
    ten: string;
    userName: string;
    diaChi: string[];
    email: string;
    gioiTinh: string;
    ngaySinh: string;
    loaiTK: string;
    trangThai: boolean;
    sdt: string;
};

export interface UpdatedList {
    hoDem?: string;
    ten?: string;
    email?: string;
    gioiTinh?: string;
    ngaySinh?: string;
    sdt?: string;
}

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getUser();
    }

    async loginUser(userName: string, password: string) {
        const form = {
            userName,
            password
        }
        try {
            const response = await axiosInstance.post('', form);

            if (response.data) {
                if (response.data.user) {
                    runInAction(() => {
                        this.user = response.data.user;
                    })
                }
                return response.data;
            }

        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async singinUser(hoDem: string, ten: string, userName: string, password: string) {
        const form = {
            hoDem,
            ten,
            userName,
            password,
            loaiTK: 'KH'
        }
        try {
            const response = await axiosInstance.post('', form);

            if (response) {
                if (response.data) {
                    return response.data;
                }
            }

            return { message: "Đăng ký thành công!" };

        } catch (error) {
            console.error('Lỗi đăng kí:', error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getUser() {
        try {
            // const response = await axiosInstance.get('');

            // if (response.data) {
            //     if (response.data.user) {
            //         runInAction(() => {
            //             this.user = response.data.user;
            //         })

            //     }
            //     return response.data;
            // }

            runInAction(() => {
                this.user = {
                    _id: '1',
                    hoDem: 'nv',
                    ten: 'h',
                    userName: 'nvh18102003',
                    diaChi: ['1', '2'],
                    email: '123@gmail.com',
                    gioiTinh: 'Nam',
                    ngaySinh: '18/10/2003',
                    loaiTK: 'KH',
                    trangThai: true,
                    sdt: '0123456789'
                };
            })

        } catch (error) {
            console.error("Lỗi lấy thông tin người dùng: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async updateUser(updatedList: UpdatedList) {
        try {
            // const response = await api.put('', updatedList);

            // if (response.data) {
            //     if (response.data.user) {
            //         runInAction(() => {
            //             this.user = response.data.user;
            //         })
            //     }
            // }
            console.log(updatedList);
            runInAction(() => {
                this.user = {
                    _id: '1',
                    hoDem: updatedList.hoDem || '',
                    ten: updatedList.ten || '',
                    userName: 'nvh18102003',
                    diaChi: ['1', '2'],
                    email: updatedList.email || '',
                    gioiTinh: updatedList.gioiTinh || '',
                    ngaySinh: updatedList.ngaySinh || '',
                    loaiTK: 'KH',
                    trangThai: true,
                    sdt: '0123456789'
                };
            })

        } catch (error) {
            console.error("Lỗi sửa thông tin người dùng: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async changePassword(oldPassword: string, newPassword: string) {
        try {
            const response = await api.put('/profile/changePassword', { oldPassword, newPassword });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Lỗi đổi mật khẩu: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async logout() {
        try {
            destroyCookie(null, 'token');
            runInAction(() => {
                this.user = null;
            })
            return { message: "Đăng xuất thành công" };
        } catch (error) {
            console.log("Lỗi đăng xuất ", error);
        }
    }
}

export const userStore = new UserStore();    