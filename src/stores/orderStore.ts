import api from "@/utils/axios_catch_error_token";
import axiosInstance from "@/utils/axiosInstance";
import { makeAutoObservable, runInAction } from "mobx";
import { orderDetailStore } from "./orderDetail";
import axios from "axios";

export interface IOrder {
    _id: string;
    trangThaiDon: string;
    ptVanChuyen: string;
    ptThanhToan: string;
    tongTien: number;
    ghiChu: string;
    diaChiDatHang?: string;
    createdAt?: string;
    soLuong?: number;
}

class OrderStore {
    cart: IOrder | null = null;
    orders: IOrder[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getCart() {
        try {
            const response = await axiosInstance.get('/api/order/getCart');

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
            // console.error("Lỗi xem giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getCartSelected() {
        try {
            const response = await api.get('api/order/getSelectedProduct');
            console.log(response.data);

            if (response.data) {
                if (response.data.cartDetail) {
                    console.log('response.data', response.data.cartDetail)
                    await orderDetailStore.getSelectedCartDetail(response.data.cartDetail);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xem sản phẩm được chọn trong giỏ hàng", error);
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
            // console.error("Lỗi thêm sản phẩm vào giỏ hàng", error);
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

    async createOrder(diaChi: string, ptVanChuyen: string, ptThanhToan: string, ghiChu: string) {
        try {
            const response = await api.post('/api/order/createPaymentOrder', { diaChi, ptVanChuyen, ptThanhToan, ghiChu });

            if (response.data) {
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi tạo đơn đặt", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getOrders() {
        try {
            const response = await api.get('/api/order/customerGetSaleInvokes');

            if (response.data) {
                if (response.data.saleInvoices) {
                    runInAction(() => {
                        this.orders = response.data.saleInvoices;
                    })
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xem đơn đặt", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getOrderDetail(id: string) {
        try {
            const response = await api.get(`/api/order/getSaleInvoikeDetail/${id}`);

            if (response.data) {
                if (response.data.saleInvoice) {
                    runInAction(() => {
                        this.orders = [response.data.saleInvoice];
                    })
                }

                if (response.data.detailSaleInvoices) {
                    await orderDetailStore.getOrderDetail(response.data.detailSaleInvoices);
                }
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xem chi tiết đơn đặt", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async updateOrderDetail(id: string, diaChiDatHang: string | null, ptVanChuyen: string | null) {
        try {
            if (diaChiDatHang) {
                const response = await api.put(`/api/order/editOrder/${id}`, { diaChiDatHang });

                if (response.data) {
                    if (response.data.saleInvoice) {
                        runInAction(() => {
                            this.orders = [response.data.saleInvoice];
                        })
                    }

                    if (response.data.detailSaleInvoices) {
                        await orderDetailStore.getOrderDetail(response.data.detailSaleInvoices);
                    }
                    return response.data;
                }
            }
            else if (ptVanChuyen) {
                const response = await api.put(`/api/order/editOrder/${id}`, { ptVanChuyen });

                if (response.data) {
                    if (response.data.saleInvoice) {
                        runInAction(() => {
                            this.orders = [response.data.saleInvoice];
                        })
                    }

                    if (response.data.detailSaleInvoices) {
                        await orderDetailStore.getOrderDetail(response.data.detailSaleInvoices);
                    }
                    return response.data;
                }
            }

        } catch (error) {
            console.error("Lỗi sửa chi tiết đơn đặt", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async cancelOrder(id: string) {
        try {
            const response = await api.patch(`/api/order/cancelOrder/${id}`);

            if (response.data) {
                if (response.data.saleInvoices) {
                    runInAction(() => {
                        this.orders = response.data.saleInvoices;
                    })
                }

                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xóa đơn đặt", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async completeOrder(id: string) {
        try {
            const response = await api.patch(`/api/order/completeOrder/${id}`);

            if (response.data) {
                if (response.data.saleInvoices) {
                    runInAction(() => {
                        this.orders = response.data.saleInvoices;
                    })
                }

                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xóa đơn đặt", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }
}


export const orderStore = new OrderStore();