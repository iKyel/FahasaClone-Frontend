import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface IOrderDetail {
    _id: string;
    sanPhamId: string;
    tenSP: string;
    giaBan: number;
    khuyenMai: number;
    soLuongTon: number;
    imageUrl: string;
    soLuong: number;
    thanhTien: number;
    daChon: boolean;
}

class OrderDetailStore {
    cartDetail: IOrderDetail[] | null = null;
    orderDetail: IOrderDetail[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getCartDetail(cartDetail: any) {
        try {
            if (cartDetail) {
                runInAction(() => {
                    this.cartDetail = cartDetail;
                })
            }

        } catch (error) {
            console.error("Lỗi xem chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getOrderDetail(orderDetail: any) {
        try {
            if (orderDetail) {
                runInAction(() => {
                    this.orderDetail = orderDetail;
                })
            }

        } catch (error) {
            console.error("Lỗi xem chi tiết giỏ hàng", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

}

export const orderDetailStore = new OrderDetailStore();