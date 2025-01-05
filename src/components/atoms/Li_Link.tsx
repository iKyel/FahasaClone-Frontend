import Link from 'next/link'
import React from 'react'

interface MyComponentProps {
    href: string;
    text: string;
    icon: string;
    inSite: boolean;
    onClick: (path: string) => void;
}

const Li_Link: React.FC<MyComponentProps> = ({ href, text, icon, inSite, onClick }) => {
    return (
        <Link
            href={href}
            className={`p-1 rounded-md flex items-center hover:text-red-700 ${inSite ? 'font-bold text-red-700' : ''}`}
            onClick={() => onClick(href)}
        >
            <i className={icon}></i>
            <li className='pl-4 '>
                {text}
            </li>
        </Link>

    )
}

export default Li_Link