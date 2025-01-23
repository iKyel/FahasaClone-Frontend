import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ListValue } from '../organisms/SlideBar_Product';

interface ChildComponentProps {
    setPagination: (filter: ListValue) => void;
    totalPage: string | null;
    selectedPage: string;
}

const Pagination = observer(({ setPagination, totalPage, selectedPage }: ChildComponentProps) => {
    const totalPages = totalPage ? parseInt(totalPage) : 1;

    const handlePageChange = (page: number) => {
        setPagination({ page: page.toString() });
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 mx-1 rounded ${parseInt(selectedPage) === i ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            if (parseInt(selectedPage) >= 1) {
                pages.push(
                    <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className={`px-4 py-2 mx-1 rounded ${parseInt(selectedPage) === 1 ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                    >
                        1
                    </button>
                );
            }

            if (parseInt(selectedPage) > 2) {
                pages.push(<span key="ellipsis" className="mx-1">...</span>);
            }

            const start = Math.max(2, parseInt(selectedPage) - 1);
            const end = Math.min(totalPages - 1, parseInt(selectedPage) + 1);

            for (let i = start; i <= end; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 mx-1 rounded ${parseInt(selectedPage) === i ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                    >
                        {i}
                    </button>
                );
            }

            if (parseInt(selectedPage) < totalPages - 1) {
                pages.push(<span key="ellipsis-end" className="mx-1">...</span>);
            }

            if (parseInt(selectedPage) <= totalPages) {
                pages.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-4 py-2 mx-1 rounded ${parseInt(selectedPage) === totalPages ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-4">
            {renderPageNumbers()}
        </div>
    );
});

export default Pagination;
