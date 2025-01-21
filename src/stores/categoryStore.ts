import axiosInstance from "@/utils/axiosInstance";
import buildCategoryTree from "@/utils/buildCategoryTree";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface ICategory {
    _id: string;
    ten: string;
    parentId?: string | null;
    children?: ICategory[];
};

class CategoryStore {
    categories: ICategory[] | null = null;
    category: ICategory | null = null;

    constructor() {
        makeAutoObservable(this);
        this.getCategories();
    }

    async getCategories() {
        try {
            const response = await axiosInstance.get('/api/category/getCategories');

            if (response.data) {
                if (response.data.categories) {
                    runInAction(() => {
                        this.categories = buildCategoryTree(response.data.categories);
                    })
                }

                return response.data;
            }

        } catch (error) {
            console.error("Lỗi lấy danh mục sản phẩm: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }

    async getCategoriesById(danhMucId: string) {
        try {
            const response = await axiosInstance.get(`/api/category/getCategoryName/${danhMucId}`);

            if (response.data) {
                if (response.data.category) {
                    runInAction(() => {
                        this.category = response.data.category;
                    })
                }

                return response.data;
            }

        } catch (error) {
            console.error("Lỗi lấy tên danh mục sản phẩm: ", error);
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                return error.response.data;
            }
        }
    }
}

export const categoryStore = new CategoryStore();    