import api from "@/utils/axios_catch_error_token";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface IFeatureValue {
    _id: string;
    tenDT: string;
    giaTri: string;
    tenTruyVan: string;
};

export interface IFeatureListValue {
    _id: string;
    ten: string;
    tenTruyVan: string;
    dsGiaTri: string[];
}

export interface ISupplier {
    _id: string;
    ten: string;
}

class FeatureStore {
    featureValue: IFeatureValue[] | null = null;
    supplier: ISupplier | null = null;
    featureListValue: IFeatureListValue[] | null = null;
    supplierList: ISupplier[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getFeatureValue(features: IFeatureValue[], supplier: ISupplier) {
        if (features.length > 0) {
            runInAction(() => {
                this.featureValue = features;
                this.supplier = supplier;
            })
        }
    }

    async getFeatureListValueByCategoryId(danhMucId: string) {
        danhMucId = '677fc1e802c44b15ec070958'
        try {
            const response = await axiosInstance.get(`/api/category/getFeaturesByCategory/${danhMucId}`);

            if (response.data) {
                if (response.data.features && response.data.supplier)
                    runInAction(() => {
                        this.featureListValue = response.data.features;
                        this.supplierList = response.data.supplier;
                    })
                return response.data;
            }

        } catch (error) {
            console.error("Lỗi lấy đặc trưng dựa trên danh mục sản phẩm: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }
}

export const featureStore = new FeatureStore();