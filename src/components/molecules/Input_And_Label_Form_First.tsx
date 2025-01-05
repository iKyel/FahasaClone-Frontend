import React from 'react'
interface MyComponentProps {
    text: string;
    placeholder: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input_And_Label_Form_First: React.FC<MyComponentProps> = ({ text, placeholder, type, id, value, onChange }) => {
    return (
        <div className="mb-2">
            <label htmlFor={id} className="block pl-1 text-sm font-medium text-gray-700">
                {text}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e)}
                className="block mt-2 pl-4 w-full h-10 rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default Input_And_Label_Form_First;