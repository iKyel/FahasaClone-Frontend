import React from 'react'

const Search_Header = () => {
    return (
        <form action="">
            <div className="relative h-8 md:h-11 border rounded-xl">
                <input
                    type="text"
                    className="w-full h-full focus:outline-none focus:ring-0 border rounded-lg pl-4 md:pr-12"
                    placeholder="Tìm kiếm..."
                />
                <span className="absolute right-1 top-1 h-4/5 w-1/12 bg-[#C92127] rounded-md cursor-pointer hidden md:block">
                    <img
                        className="h-6 w-6 m-auto mt-1"
                        src="/images/header/ico_search_white.svg"
                        alt="search"
                    />
                </span>
            </div>
        </form>
    )
}

export default Search_Header;