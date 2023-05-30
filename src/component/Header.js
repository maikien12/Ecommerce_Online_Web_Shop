import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineUserCircle } from 'react-icons/hi'
import {BsCartFill} from 'react-icons/bs'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'

function Header() {
    const [showMenu, setShowMenu] = useState(false)
    const handleShowmenu = () => {
        setShowMenu(preve => !preve)
    }
    const userData = useSelector((state) => state.user)
    console.log(userData.email)
    const dispatch = useDispatch()

    const handelLogout = () => {
        dispatch(logoutRedux())
        toast("Logout successfully")
    }

const CartItemNumber = useSelector((state) => state.product.CartItem)




  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
            {/* deskop */}
        <div className='flex items-center h-full justify-between'>
            <Link to={""}>
            <div className='h-10'>
                <img src='./img/logo.png' alt='' className='h-full'/>
            </div>
            </Link>

            <div className='flex items-center gap-4 md:gap-7'>
                <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                    <Link to={''} 
                    className='hover:bg-red-300 rounded-md font-semibold text-slate-900 text-center flex items-center justify-center min-h-[50px] min-w-[100px]'>
                        Home</Link>
                    <Link to={'menu/646da7059c26d3736e343735'}
                    className='hover:bg-red-300 rounded-md font-semibold text-slate-900 text-center flex items-center justify-center min-h-[50px] min-w-[100px]'
                    >Menu</Link>
                    <Link to={'about'}
                    className='hover:bg-red-300 rounded-md font-semibold text-slate-900 text-center flex items-center justify-center min-h-[50px] min-w-[100px]'
                    >About</Link>
                    <Link to={'contact'}
                    className='hover:bg-red-300 rounded-md font-semibold text-slate-900 text-center flex items-center justify-center min-h-[50px] min-w-[100px]'
                    >Contact</Link>
                </nav>
                <div className='text-2xl  text-slate-600  relative  '>
                   <Link to={"cart"}> <BsCartFill  />
                    <div 
                    className='
                    absolute 
                    -top-1 -right-1
                     text-white
                      bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center '
                    >{CartItemNumber.length}</div>
                    </Link>

                </div>
                <div className='text-slate-600 cursor-pointer '  onClick={handleShowmenu}>
                    <div className='text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md'>

    {userData.image ? <img src={userData.image} className="h-full w-full"/> : <HiOutlineUserCircle className='min-h-[40px]'/>}
                    

                    </div>

                    {showMenu && (
                        <div className='absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px]'>
                       {
                           userData.email === process.env.REACT_APP_ADMIN_EMAIL &&  <Link to={'newproduct'} className='whitespace-nowrap px-2 cursor-pointer'>New product</Link>
                       }
                       
                        {
                            userData.image ? <p onClick={handelLogout} className='cursor-pointer px-2'>Logout ({userData.firstName}) </p> : <Link to={'login'} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>
                        }
                             <nav className='text-base md:text-lg flex flex-col md:hidden'>
                    <Link to={''} className='px-2'>Home</Link>
                    <Link to={'menu/646da7059c26d3736e343735'} className='px-2 py-1'>Menu</Link>
                    <Link to={'about'} className='px-2 py-1'>About</Link>
                    <Link to={'contact'} className='px-2 py-1'>Contact</Link>
                </nav>
                        
                        </div>
                    )}
                  
                   
                </div>

            </div>
        </div>


            {/* mobile */}
    </header>
  )
}

export default Header
