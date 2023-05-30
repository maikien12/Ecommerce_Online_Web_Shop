import React from 'react'
import {BiShow} from 'react-icons/bi'
import {BiHide} from 'react-icons/bi'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/imagetoBase64'
import loginSingupImage from "../assest/login-animation.gif"
import { toast } from 'react-hot-toast'



function Singup() {
  const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   
    const [data,setData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmpassword: "",
          image: "",
    });
    // console.log(data)
    // show password
    const handleShowPassword = () =>{
        setShowPassword(preve => !preve)
    };
    // show confirm password
    const handleShowConfirmPassword = () =>{
        setShowConfirmPassword(preve => !preve)
    };

    // upload image
    const handleUploadProfile = async(e) =>{
        const data = await ImagetoBase64(e.target.files[0])
   

        setData((preve) => {
          return{
            ...preve,
            image: data
          }
        })

    };


      // submit 
    const handleOnChange = (e) =>{
      const {name,value} = e.target
      setData((preve) =>{
        return{
          ...preve,
          [name] : value
        }
      })
    };

    console.log(process.env.REACT_APP_SERVER_DOMIN)
    const handleSubmit = async(e) =>{
      e.preventDefault();
      const {firstName, email, password, confirmpassword} = data
      if(firstName && email && password && confirmpassword){
          if(password === confirmpassword){

            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/singup`,{
              method : "POST",
              headers : {
                "content-type" : "application/json"
              },
              body : JSON.stringify(data)
            })

            const dataRes = await fetchData.json()
      

            // alert(dataRes.message);
            toast(dataRes.message);
            
            if(dataRes.alert){
              navigate("/Login");
            }
          }
          else{
            alert("password and confirm password not equal")
          }
      }
      else{
        alert("please Enter required fields")
      }

    }


  return (
    <div className='p-3 md:p-4'>
     <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md m-auto relative '>
            <img src={data.image ? data.image : loginSingupImage}  className='w-full h-full'/>

            <label htmlFor='profileImage'>
            <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-20 w-full text-center cursor-pointer'>
              <p className='text-sm p-1 text-white'>Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept='image/*' className='hidden' onChange={handleUploadProfile}/>
            </label>

        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor='firstName' className='mb-1'>First Name</label>
            <input type={"text"} id="firstName" name="firstName" 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded 
            focus-within:outline-blue-400'
             value={data.firstName}
             onChange={handleOnChange}
            />

            <label htmlFor='lastName' className='mb-1'>Last Name</label>
            <input type={"text"} id="lastName" name="lastName" 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded'
            value={data.lastName}
            onChange={handleOnChange}
            />

            <label htmlFor='Email'>Email</label>
            <input type={"email"} id="email" name="email" 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded'
            value={data.email}
            onChange={handleOnChange}
            />


            <label htmlFor='Password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline-none'> 
            <input type={showPassword ? "text":"password"} id="password" name="password" 
            className=' w-full bg-slate-200 border-none outline-none'
            value={data.password}
            onChange={handleOnChange}
            />
           <span className='flex text-xl cursor-pointer'
           onClick={handleShowPassword}
           >{showPassword ?<BiShow/> : <BiHide/>}</span>
           </div>

           <label htmlFor='ConfirmPassword'>Confirm Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline-none'> 
            <input type={showConfirmPassword ? "text":"password"} id="confirmpassword" name="confirmpassword" 
            className=' w-full bg-slate-200 border-none outline-none'
            value={data.confirmpassword}
            onChange={handleOnChange}
            />
           <span className='flex text-xl cursor-pointer'
           onClick={handleShowConfirmPassword}
           >{showConfirmPassword ?<BiShow/> : <BiHide/>}</span>
           </div>
           <button 
           type='submit'
           className='w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer
           text-white text-xl font-medium text-center py-1 rounded-full mt-4 
           ' >Sing Up</button>
        
        </form>
        <p>Already Have Account ? <Link className='text-red-500 underline ' to={'/Login'}>Login</Link> </p> 

     </div>
    </div>
  )
}

export default Singup;
