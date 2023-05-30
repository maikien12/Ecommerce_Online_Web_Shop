import React from 'react'
import { CiForkAndKnife } from 'react-icons/ci';

const FilterProduct = ({category,onClick, isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5 bg-red-300 rounded-full cursor-pointer ${isActive ? "bg-red-500  text-white" : ""}`}>
              <CiForkAndKnife />
            </div>
            <p className='text-center font-medium my-1 capitalize'>{category}</p>

    </div>
  )
}

export default FilterProduct
