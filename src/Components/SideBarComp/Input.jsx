import React from 'react'

const Input = ({name,type,placeholder,className,value,onChange,onBlur}) => {
  return (
    <div>
         <input
              type={type}
              name={name}
              placeholder={placeholder}
              className={className}
              value={value}
              onChange={onChange}
              onBlur={onBlur}

            />
    </div>
  )
}

export default Input;