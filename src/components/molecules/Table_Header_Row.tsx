import React from 'react'
interface MyComponentProps {
  quantity: number;
  selectAll: boolean;
  handleSelectAll: () => void;
}

const Table_Header_Row: React.FC<MyComponentProps> = ({ quantity, selectAll, handleSelectAll }) => {
  return (
    <div className='p-2 rounded-lg bg-white mb-2 '>
      <table className="w-full border-collapse">
        <thead className="">
          <tr>
            <th className="w-7/12 font-thin text-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-5 h-5 mx-3"
                />
                <p className='flex items-center text-center'>
                  Chọn tất cả
                  <span className='ml-1'>
                    ({quantity} sản phẩm)
                  </span>
                </p>
              </div>
            </th>

            <th className="hidden md:table-cell w-1/12 md:text-center font-thin">
              Số lượng
            </th>

            <th className="hidden md:table-cell w-1/6 text-center font-thin">
              Thành tiền
            </th>

            <th className="hidden md:table-cell w-1/12 text-center font-thin">
            </th>

          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Table_Header_Row