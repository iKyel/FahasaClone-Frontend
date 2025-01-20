'use client';

import React, { useState } from 'react'
interface MyComponentProps {
    note: string;
    handleChangeNote: (note: string) => void;
}

const Note_Option: React.FC<MyComponentProps> = ({ note, handleChangeNote }) => {
    const [isCheck, setIsCheck] = useState(false)
    return (
        <div>
            <div className="py-2 flex items-center">
                <input
                    type='checkbox'
                    id='note'
                    name="note"
                    checked={isCheck}
                    onChange={(e) => {
                        setIsCheck(!isCheck);
                    }}
                    className="w-5 h-5 mr-2 cursor-pointer"
                />
                <label htmlFor='note' className='cursor-pointer'>Ghi chú</label>
            </div>

            {isCheck && (
                <input
                    type='text'
                    id='textnote'
                    name='textnote'
                    value={note}
                    onChange={(e) => handleChangeNote(e.target.value)}
                    className="block mt-2 px-4 w-full h-10 rounded border shadow-sm"
                    placeholder='Nhập ghi chú...'
                    required
                />
            )}
        </div>
    )
}

export default Note_Option