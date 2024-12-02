import React from 'react'

export const Logo: React.FC = () => {
  return (
    <svg
      width="220"
      height="40"
      viewBox="0 0 220 35"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
        `}
      </style>
      <text
        x="10"
        y="35"
        fontFamily="'Dela Gothic One', sans"
        fontSize="24"
        fill="currentColor"
        className="select-none"
      >
        BLACK LABS
      </text>
    </svg>
  )
}


export const Icon: React.FC = () => {
  return (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="75" height="75" fill="#000" />
    </svg>
  )
}