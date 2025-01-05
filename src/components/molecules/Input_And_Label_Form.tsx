import React from 'react'
interface MyComponentProps {
    text: string;
    placeholder: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input_And_Label_Form: React.FC<MyComponentProps> = ({ text, placeholder, type, id, value, onChange }) => {
    return (
        <div className="mt-4 mb-2 text-sm">
            <label htmlFor={id} className="block pl-1 font-medium text-gray-700">
                {text}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e)}
                className="block mt-2 px-4 w-full h-10 rounded border shadow-sm"
                placeholder={placeholder}
                required
            />
        </div>

    )
}

export default Input_And_Label_Form;