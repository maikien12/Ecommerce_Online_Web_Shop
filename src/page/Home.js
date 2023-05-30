import React, {  useRef } from 'react'
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import HomeCard from '../component/HomeCard';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import AllProduct from '../component/AllProduct';
import { useNavigate } from 'react-router-dom';





function Home() {
  const productData = useSelector((state) => state.product.productList);




  const homeProductCardList = productData.slice(1,5);
  const homeProductCardListVegetables = productData.filter(el => el.category === "vegetable", [])


  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(12).fill(null);

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };




  return (
    <div className='p-2 md:p-4 gap-4 py-2'>

      <div className='md:flex'>

        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png'
            className='h-7'
            />
          </div>
        <h2 className='text-4xl md:text-7xl font-bold py-2'>The Fasted Delivery in 
        <span className='text-red-300 text' > Your Home </span></h2>
        <p className='py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
           but also the leap into electronic typesetting, remaining essentially unchanged. </p>
           <button className='font-bold bg-red-300 hover:bg-red-400 text-slate-900 px-4 py-2 rounded-md'
          
           >Oder Now</button>
        </div>

        {/* <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
          homeProductCardList[0] ? homeProductCardList.map(el =>{
              return(
                <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                />
              )
            })
            : loadingArray.map((el,index) => {
              return(
                <HomeCard
                key={index}
                loading={"Loading...."}
                />
              )
            })
          }
         
        </div> */}
        <div style={{marginTop: 50,   marginLeft: 20,}}>
          <img src='./img/banner3.jpg'
          style={{height: 400, width: 700, borderBottomLeftRadius: 300}}
          />
        </div>

      </div>

      <div style={{marginTop: 50}}>
        <div className='flex w-full items-center'>
        <h2 className='font-bold text-2xl text-red-600 mb-4'>
          Fresh Vegetable
          </h2>

          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='hover:bg-red-400 text-lg rounded p-2'><GrPrevious/></button>
            <button onClick={nextProduct} className='hover:bg-red-400 text-lg rounded p-2'><GrNext/></button>
          </div>
          </div>

        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
          homeProductCardListVegetables[0] ? homeProductCardListVegetables.map(el => {
              return(
                <CardFeature
                key={el._id}
                id={el._id}
                name={el.name}
                price={el.price}
                category={el.category}
                image={el.image}
                />
              )
            })

            : 

          loadingArrayFeature.map((el, index) => ( <CardFeature loading="Loading..." key={index+ "cart Loading"}/> ))
            
            
          }
          
        </div>
      </div>

      <AllProduct heading={"Your Product"}/>


      
      
    </div>
  )
}

export default Home;
