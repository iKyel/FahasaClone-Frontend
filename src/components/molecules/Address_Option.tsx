import React from 'react'
interface MyComponentProps {
    diaChi: string[];
    selectedAddress: string;
    handleSelectAddress: (diaChi: string) => void;
}
const Address_Option: React.FC<MyComponentProps> = ({ diaChi, selectedAddress, handleSelectAddress }) => {
    return (
        <div className="my-2 text-sm">
            {diaChi.map((item, index) => (
                <div
                    className="py-2 flex items-center"
                    key={index}
                >
                    <input
                        type='radio'
                        id={`diachi${index}`}
                        name="diaChi"
                        checked={selectedAddress === item}
                        value={item}
                        onChange={(e) => {
                            handleSelectAddress(e.target.value)
                        }}
                        className="w-5 h-5 mr-2 cursor-pointer"
                    />
                    <label htmlFor={`diachi${index}`} className='cursor-pointer'>{item}</label>
                </div>
            ))
            }
        </div>
    )
}

export default Address_Option