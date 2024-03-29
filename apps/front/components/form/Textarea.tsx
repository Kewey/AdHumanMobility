import React, { TextareaHTMLAttributes } from 'react'

interface TextareaComponentProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  register: any
}

function Textarea({
  label,
  placeholder,
  name,
  register,
  required,
  ...props
}: TextareaComponentProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-gray-400 font-semibold block w-full"
        >
          {label}
        </label>
      )}
      <textarea
        {...(register && register(name, { required }))}
        placeholder={placeholder}
        id={name}
        name={name}
        className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border rounded-lg"
        {...props}
      />
    </div>
  )
}

export default Textarea
