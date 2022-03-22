import React from 'react'

function Button({ children, onClick, className, bgColor = 'primary' }) {
    let bgClassName = 'bg-primary';
    switch (bgColor) {
        case 'secondary':
            bgClassName = 'bg-secondary'
            break;
        default:
            break;
    }
  return (
    <button
    onClick={onClick}
    className={`p-3 mt-auto w-full capitalize text-white text-base font-bold ${bgClassName} rounded-md ${className}`}
    >{children}</button>
  )
}

export default Button