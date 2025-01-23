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
            password,
            loaiTK: 'KH'
        }
        try {
            const response = await axiosInstance.post('/api/account/login', form);
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
            const response = await axiosInstance.post('/api/account/register', form);

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

    async logout() {
        try {
            const response = await api.get('/api/account/logout');

            if (response.data.message) {
                destroyCookie(null, 'token');
                // runInAction(() => {
                //     this.user = null;
                // })
                return { message: "Đăng xuất thành công" };
            }
        } catch (error) {
            console.log("Lỗi đăng xuất ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getUser() {
        try {
            const response = await axiosInstance.get('/api/account/getAccount');

            if (response.data) {
                if (response.data.user) {
                    runInAction(() => {
                        this.user = response.data.user;
                    })
                }
                return response.data;
            }

        } catch (error) {
            // console.error("Lỗi lấy thông tin người dùng: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async updateUser(updatedList: UpdatedList) {
        try {
            const response = await api.put('/api/account/updateAccount', updatedList);

            if (response.data) {
                if (response.data.user) {
                    runInAction(() => {
                        this.user = response.data.user;
                    })
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi sửa thông tin người dùng: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async createAddress(newAddress: string) {
        try {
            const response = await api.post('/api/account/createAddress', { newAddress });

            if (response && response.data) {
                if (response.data.user) {
                    runInAction(() => {
                        this.user = response.data.user;
                    })
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi thêm địa chỉ: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async deleteAddress(idx: number) {
        try {
            const response = await api.delete(`/api/account/deleteAddress/${idx}`);

            if (response && response.data) {
                if (response.data.diaChi) {
                    runInAction(() => {
                        if (this.user) this.user.diaChi = response.data.diaChi;
                    })
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xóa địa chỉ: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async setDefaultAddress(addressIdx: number) {
        try {
            const response = await api.put('/api/account/setDefaultAddress/', { addressIdx });

            if (response && response.data) {
                if (response.data.diaChi) {
                    runInAction(() => {
                        if (this.user) this.user.diaChi = response.data.diaChi;
                    })
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi đặt địa chỉ mặc định: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async changePassword(oldPassword: string, newPassword: string) {
        try {
            const response = await api.put('/api/account/changePassword', { oldPassword, newPassword });

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
}

export const userStore = new UserStore();    