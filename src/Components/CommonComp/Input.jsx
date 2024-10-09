import React from 'react'

const Input = ({name,type,placeholder,className,value,onChange,onBlur,text,focus}) => {
  console.log(text);
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
              ref={text}
              autoFocus={focus}
            />
    </div>
  )
}

export default Input;