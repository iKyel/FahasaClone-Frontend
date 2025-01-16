import api from "@/utils/axios_catch_error_token";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { orderDetailStore } from "./orderDetail";

export interface IOrder {
    _id: string;
    trangThaiDon: string;
    ptVanChuyen: string;
    ptThanhToan: string;
    tongTien: number;
    ghiChu: string;
}

class OrderStore {
    cart: IOrder | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getCart();
    }

    async setNull() {
        runInAction(() => {
            this.cart = null;
        });

        await orderDetailStore.setNull();
    }

    async getCart() {
        try {
            const response = await api.get('/api/order/getCart');

            if (response.data) {
                if (response.data.cart) {
                    runInAction(() => {
                        this.cart = response.data.cart;
                    })
                }

                if (response.data.cartDetail) {
                    await orderDetailStore.getCartDetail(response.data.cartDetail);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xem giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async addProductToCart(_id: string, numberOfProduct: number) {
        try {
            const response = await api.post('/api/order/addToCart', { _id, numberOfProduct });
            if (response.data) {
                if (response.data.cart) {
                    runInAction(() => {
                        this.cart = response.data.cart;
                    })
                }

                if (response.data.cartDetail) {
                    await orderDetailStore.getCartDetail(response.data.cartDetail);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi thêm sản phẩm vào giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async selectOrderDetail(id: string | boolean) {
        try {
            const response = await api.patch('/api/order/selectProductInCart', { id });

            if (response.data) {
                if (response.data.cart) {
                    runInAction(() => {
                        this.cart = response.data.cart;
                    })
                }

                if (response.data.cartDetail) {
                    await orderDetailStore.getCartDetail(response.data.cartDetail);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi chọn sản phẩm trong giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async updateProductToCart(_id: string, newQuantity: number) {
        try {
            const response = await api.put('/api/order/update', { _id, newQuantity });
            if (response.data) {
                if (response.data.cart) {
                    runInAction(() => {
                        this.cart = response.data.cart;
                    })
                }

                if (response.data.cartDetail) {
                    await orderDetailStore.getCartDetail(response.data.cartDetail);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi sửa sản phẩm trong giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async deleteProductToCart(id: string) {
        try {
            const response = await api.delete(`/api/order/remove/${id}`);
            if (response.data) {
                if (response.data.cart) {
                    runInAction(() => {
                        this.cart = response.data.cart;
                    })
                }

                if (response.data.cartDetail) {
                    await orderDetailStore.getCartDetail(response.data.cartDetail);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xóa sản phẩm trong giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }
}

export const orderStore = new OrderStore();