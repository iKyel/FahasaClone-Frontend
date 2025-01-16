import api from "@/utils/axios_catch_error_token";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface IFeatureValue {
    _id: string;
    ten: string;
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

    async getFeatureListValue(features: IFeatureListValue[], supplier: ISupplier[]) {
        if (features.length > 0) {
            runInAction(() => {
                this.featureListValue = features;
                this.supplierList = supplier;
            })
        }
    }

}

export const featureStore = new FeatureStore();