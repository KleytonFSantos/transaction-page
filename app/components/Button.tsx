import React from "react";

type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  color?: string;
}

export const Button = ({text, type, onClick, color}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`flex w-full justify-center rounded-md ${color ? 'bg-' + color + '-600'  : "bg-indigo-600" } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        {text}
      </button>
    </div>
  );
}