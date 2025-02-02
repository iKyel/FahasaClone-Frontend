import React from 'react'
interface MyComponentProps {
    text: string;
    placeholder: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input_And_Label_Profile: React.FC<MyComponentProps> = ({ text, placeholder, type, id, value, onChange }) => {
    return (
        <div className="mt-4 mb-2 text-sm md:flex items-center">
            <label htmlFor={id} className="md:w-1/5 w-full block pl-1 font-medium">
                {text}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e)}
                className="block px-4 w-2/3 h-10 rounded border shadow-sm"
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default Input_And_Label_Profile