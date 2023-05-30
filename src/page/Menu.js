import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlide'

const Menu = () => {
  const {filterby} = useParams()
  const navigate = useNavigate()
  const productData = useSelector(state => state.product.productList)
 
  const productDisplay = productData.filter(el => el._id === filterby)[0]


  const dispatch = useDispatch()
  
  const handleAddCartProduct = (e) => {

    dispatch(addCartItem(productDisplay))
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay))
    navigate("/cart")
  }

  
  

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl  m-auto md:flex bg-white'>
  
        <div className='max-w-sm overflow-hidden w-full p-5'>
          <img src={productDisplay.image} className='hover:scale-105 transition-all h-full'/>
        </div>

        <div className='flex flex-col gap-1'>
        <h3 className='font-semibold text-slate-900  capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
      <p className='text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
      <p className=' font-bold text-red-600 text-2xl'>{productDisplay.price}</p>
      <div className='flex gap-3'>
      <button 
      className='bg-red-300 font-semibold text-slate-900  py-1  mt-2 hover:bg-red-500 min-w-[100px] '
      onClick={handleBuy}
      >Buy</button>
      <button className='bg-red-300 font-semibold text-slate-900  py-1  mt-2 hover:bg-red-500 min-w-[100px]'
      onClick={handleAddCartProduct}
      >Add Cart</button>

      </div>
      <div>
        <p className='text-slate-600 font-medium'>Description : </p>
        <p>{productDisplay.description}</p>
      </div>

        </div>
        
        

      </div>

      <AllProduct heading={"Retated Product"} />

    </div>
  )
}

export default Menu
