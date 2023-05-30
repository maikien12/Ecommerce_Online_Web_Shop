import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsCloudUpload } from 'react-icons/bs'
import { ImagetoBase64 } from '../utility/imagetoBase64'

function NewProduct() {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
  })
  const handelOnchange = (e) => {
    const {name, value} = e.target
    setData((preve) => {
      return{
        ...preve,
        [name] : value
      }
    })
  }
const uploadImage = async(e) => {
  const data = await ImagetoBase64(e.target.files[0])
  // console.log(data)
  setData((preve) => {
     return{
      ...preve,
      image : data
     }
  })

}
const handelSubmit = async(e) => {
  e.preventDefault()
  console.log(data)

  const {name, image, category, price} = data || {}
  if(name && image && category && price){
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
  
    const fetchRes = await fetchData.json()
    console.log(fetchRes)
    toast(fetchRes.message)

    setData(() => {
      return{
        name : "",
        category : "",
        image : "",
        price : "",
        description : "",
      }
    })
  }
    else{
    toast("Enter required Fields")
  }




  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handelSubmit}>
        <label html='name'>Name</label>
        <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handelOnchange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' name='category' id='category' onChange={handelOnchange} value={data.category}>
          <option value={"other"}>Select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"bugger"}>Bugger</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"chicken"}>Chicken</option>
          <option value={"noodles"}>Noodles</option>
          <option value={"paneer"}>Paneer</option>
        </select>

        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
        {
          data.image ? <img src={data.image} className="h-full" /> :   <span className='text-5xl'> <BsCloudUpload /></span>
        }
       
       
         <input type={"file"} accept="image/*" id="image" onChange={uploadImage}  className='hidden'/>

        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} name='price' className="bg-slate-200 p-1 my-1" onChange={handelOnchange} value={data.price}/>

        <label htmlFor='description'>Descriptions</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handelOnchange}></textarea>
       <button className='bg-red-500 hover:bg-red-600 text-white text-lg my-2 font-medium drop-shadow'>Save</button>

      </form>
    </div>
  )
}

export default NewProduct
