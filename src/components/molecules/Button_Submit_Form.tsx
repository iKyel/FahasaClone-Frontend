import React from 'react'
interface MyComponentProps {
    text: string;
    hasErrors: boolean;
}

const Button_Submit_Form: React.FC<MyComponentProps> = ({ text, hasErrors }) => {
    return (
        <div className="flex justify-center mt-6">
            <button
                type="submit"
                className={`w-64 py-2 px-4 rounded-md bg-red-700 text-white font-semibold text-sm ${hasErrors ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {text}
            </button>
        </div>
    )
}

export default Button_Submit_Form