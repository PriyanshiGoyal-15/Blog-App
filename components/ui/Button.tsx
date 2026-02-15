import React from "react";

export default function Button({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
    >
      {children}
    </button>
  );
}
