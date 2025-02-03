import Sidebar from '@/components/organisms/SlideBar'
import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
}

const Layout_Customer: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="md:flex">
            <Sidebar />
            <div className='md:w-3/4 md:mt-0 mt-4 w-full'>
                {children}
            </div>

        </div>
    )
}

export default Layout_Customer;