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
    selectedCartDetail: IOrderDetail[] | null = null;
    orderDetail: IOrderDetail[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getCartDetail(cartDetail: any) {
        try {
            if (cartDetail) {
                console.log('cartDetail', cartDetail);
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

    async getSelectedCartDetail(cartDetail: any) {
        try {
            if (cartDetail) {
                console.log('selectcartDetail', cartDetail);
                runInAction(() => {
                    this.selectedCartDetail = cartDetail;
                })
            }

        } catch (error) {
            console.error("Lỗi lấy danh sách sản phẩm đã chọn trong giỏ hàng", error);
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