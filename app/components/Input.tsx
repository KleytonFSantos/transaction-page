import React, { forwardRef } from "react";

type InputProps = {
    label: string,
    name: string,
    type: string,
    value?: string
}

// eslint-disable-next-line react/display-name
export const Input: React.FC<InputProps> = forwardRef(({ label, name, type, ...props}: InputProps, ref) => {
    return (
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref}
            name={name}
            type={type}
            autoComplete={name}
            {...props}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
})
