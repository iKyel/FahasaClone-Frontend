import api from "@/utils/axios_catch_error_token";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { featureStore } from "./featureStore";

export interface KichThuocProps {
    dai: string;
    rong: string;
    cao: string;
}

export interface IProduct {
    _id: string;
    tenSP: string;
    imageUrl: string;
    giaBan: number;
    soLuong: number;
    trongLuong: string;
    kichThuoc?: KichThuocProps;
    khuyenMai: number;
    moTa: string;
    danhMucId: string;
    createdAt: string;
}

class ProductStore {
    products: IProduct[] | null = null;
    productDetail: IProduct | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getProductDetail(id: string) {
        try {
            const response = await axiosInstance.get(`/api/product/getProductDetail/${id}`);

            if (response.data) {
                if (response.data.productDetail) {
                    runInAction(() => {
                        this.productDetail = response.data.productDetail;
                    })
                }

                if (response.data.features || response.data.supplier) {
                    featureStore.getFeatureValue(response.data.features, response.data.supplier);
                }

                return response.data;
            }

        } catch (error) {
            console.error("Lỗi xem chi tiết sản phẩm: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getProducts(query: Record<string, string | null>) {
        try {
            const response = await axiosInstance.get('/api/product/getProducts', { params: query });

            if (response.data) {
                if (response.data.products) {
                    runInAction(() => {
                        this.products = response.data.products;
                    });
                }

                if (response.data.features || response.data.supplier) {
                    featureStore.getFeatureListValue(response.data.features, response.data.supplier);
                }

                return response.data;
            }
        } catch (error) {
            // console.error("Lỗi khi lấy danh sách sản phẩm: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                runInAction(() => {
                    this.products = null;
                })
                return error.response.data;
            }
        }
    }

    async getProductsByName(searchName: string, pageNum: string = '1') {
        try {
            const response = await axiosInstance.get('/api/product/searchProduct', { params: { searchName, pageNum } });

            if (response.data && response.data.products) {
                runInAction(() => {
                    this.products = response.data.products;
                });
                return response.data;
            }
        } catch (error) {
            // console.error("Lỗi khi tìm kiếm sản phẩm: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                runInAction(() => {
                    this.products = null;
                })
                return error.response.data;
            }
        }
    }
}
export const productStore = new ProductStore();