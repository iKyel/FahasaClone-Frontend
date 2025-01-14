'use client'

import { categoryStore } from '@/stores/categoryStore';
import { featureStore } from '@/stores/featureStore';
import { productStore } from '@/stores/productStore';
import { userStore } from '@/stores/userStore';
import React, { createContext, ReactNode, useContext } from 'react'

export interface AppContextProps {
    userStore: typeof userStore;
    categoryStore: typeof categoryStore;
    featureStore: typeof featureStore;
    productStore: typeof productStore;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(AppContext);
    if (context) return context.userStore;
};

export const useCategory = () => {
    const context = useContext(AppContext);
    if (context) return context.categoryStore;
};

export const useFeature = () => {
    const context = useContext(AppContext);
    if (context) return context.featureStore;
};

export const useProduct = () => {
    const context = useContext(AppContext);
    if (context) return context.productStore;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ userStore, categoryStore, featureStore, productStore }}>
            {children}
        </AppContext.Provider>
    );
}