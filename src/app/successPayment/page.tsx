'use client';

import React from "react";
import { useRouter } from "next/navigation";

const SuccessPayment: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-96 rounded-lg bg-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Bạn đã thanh toán thành công
                </h1>
                <div className="flex gap-4 justify-center">
                    {/* Nút Về Trang Chủ */}
                    <button
                        onClick={() => router.push("/")}
                        className="px-6 py-2 border border-red-700 text-red-700 font-semibold rounded-lg hover:bg-red-100 transition"
                    >
                        Về trang chủ
                    </button>
                    {/* Nút Đơn Mua */}
                    <button
                        onClick={() => router.push("/customer/orders")}
                        className="px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition"
                    >
                        Đơn mua
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;