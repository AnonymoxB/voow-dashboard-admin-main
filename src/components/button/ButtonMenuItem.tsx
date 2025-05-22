import Link from 'next/link'
import React, { ReactNode } from 'react'

function ButtonMenuItem({ icon, title, href, isActive }: { icon: ReactNode, title: string, href: string, isActive: boolean }) {
    return (
        <Link
            className={`flex items-center space-x-2 py-1  group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold ${isActive && 'border-r-2 border-r-indigo-700 font-semibold'}`}
            href={href}
        >
            {icon}
            <span>{title}</span>
        </Link>
    )
}

export default ButtonMenuItem