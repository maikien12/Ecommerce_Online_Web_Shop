import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlide'

const CartProduct = ({id,name,image,category,qty,total,price}) => {
    const dispatch = useDispatch()


  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border-2 border-slate-300'>
        <div className='p-3 bg-white rounded overflow-hidden'>
            <img src={image} 
            className='h-28 w-40 object-cover'
            />

        </div>
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex justify-between'>
        <h3 className='font-semibold text-slate-900  capitalize text-lg md:text-xl'>{name}</h3>
        
        <div className='ml-auto cursor-pointer text-slate-700 hover:text-red-600'
        onClick={() => dispatch(deleteCartItem(id))}
        >
        <AiFillDelete/>
        </div>
        </div>

      <p className='text-slate-500 font-medium text-2xl'>{category}</p>
      <p className=' font-bold text-red-600 text-2xl'>{price}</p>
      <div className='flex justify-between'>
        <div className='flex gap-3 items-center'>
        <button 
         onClick={() => dispatch(decreaseQty(id))}
        className='bg-red-200 font-semibold text-slate-900  py-1  mt-2 hover:bg-red-500 min-w-[100px] text-2xl'>
            -</button>
        <p className='text-2xl p-1'>{qty}</p>
        <button className='bg-red-300 font-semibold text-slate-900  py-1  mt-2 hover:bg-red-500 min-w-[100px] text-2xl'
        onClick={() => dispatch(increaseQty(id))}
        >+</button>

        </div>
        <div className='flex items-center gap-4 font-bold text-slate-700'>
            <p>Total : </p>
            <p>{total}</p>
        </div>
      </div>


        </div>
      
    </div>
  )
}

export default CartProduct;