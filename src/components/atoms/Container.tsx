import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="w-5/6 mx-auto my-2">
            {children}
        </div>
    );
}

export default Container;