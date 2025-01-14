import React from 'react'

interface MyComponentProps {
    featureName: string;
    value?: string;
}

const DetailProductInfoProps: React.FC<MyComponentProps> = ({ featureName, value }) => {
    return (
        <tr className="py-2 border-b-2 flex text-sm">
            <td className="w-1/4 text-gray-500">{featureName}</td>
            <td className="w-3/4">{value}</td>
        </tr>
    )
}

export default DetailProductInfoProps