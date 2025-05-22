import { ReactNode } from 'react'


interface ButtonProps {
    children: ReactNode,
    onClick?: () => void
    iconLeft?: ReactNode,
    iconRight?: ReactNode
    variant?: 'primary' | 'no-bg' | 'danger' | 'warning' | 'success',
    disabled?:boolean, 
    marginLeft? : ReactNode,
    marginRight?:ReactNode,
    typeButton? : ReactNode,
    isLoading? :boolean
}
function Button({ children, onClick, iconLeft, iconRight, variant = 'primary',disabled,marginLeft,marginRight,typeButton="button",isLoading=false }: ButtonProps) {
    let bg = 'px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-indigo-100';
    switch (variant) {
        case 'primary':
            bg = 'px-4 py-2 rounded-md flex items-center space-x-2 bg-indigo-100 text-indigo-500 hover:bg-indigo-200 ';
            break;
        case 'danger': 
            bg = 'px-4 py-2 rounded-md flex items-center btn btn-error btn-sm text-white';
            break;
        case 'warning' :
            bg = 'px-4 py-2 rounded-md flex items-center space-x-2 btn btn-warning btn-sm text-white';
            break;
        case 'success' :
            bg = 'px-4 py-2 rounded-md flex items-center space-x-2 btn btn-success btn-sm text-white';
            break;
    }
    return (
        <button
            className={`${bg} ${marginLeft} ${marginRight}`}
            disabled={disabled}
            onClick={onClick}
        >
            {iconLeft}
            <div className="hidden xs:block">
                <span className="items-center">{isLoading ? <span className="loading loading-spinner loading-md"></span> : children}</span>

            </div>
            {iconRight}
        </button>
    )
}

export default Button