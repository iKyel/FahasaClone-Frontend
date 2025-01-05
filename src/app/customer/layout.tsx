import Sidebar from '@/components/organisms/SlideBar'
import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
}

const Layout_Customer: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className='w-3/4'>
                {children}
            </div>

        </div>
    )
}

export default Layout_Customer;