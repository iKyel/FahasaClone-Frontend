import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
    text: string;
}

const Layout_OneStepCheckout_Prop: React.FC<ContainerProps> = ({ children, text }) => {
    return (
        <div className='my-2 p-4 bg-white'>
            <h3 className='py-2 border-b-2 font-bold'>{text}</h3>
            {children}
        </div>
    )
}

export default Layout_OneStepCheckout_Prop